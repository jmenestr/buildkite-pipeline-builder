import { pruneJSON } from "../../utils";
import { BaseStep, StepShape } from "../base/BaseStep";
import { ChainableList } from "../base/chainable-list";
import { JSONSerialization } from "../base/serialization";


type RetryType = 'manual' | 'automatic'

type AutomaticRetry = boolean | {
    exit_status?: '*' | number
    limit?: number
}

type ManualRetry = boolean | {
    allowed?: boolean
    permit_on_passed?: boolean
    reason?: string
}

export type CommandStepShape = StepShape<{
    commands: Array<string>;
    label?: string;
    agent?: { [agentKey: string]: string }
    artifact_paths?: Array<string>;
    branches?: string;
    cancel_on_build_failing?: boolean;
    concurrency?: number;
    concurrency_group?: string;
    env?: Map<string, string>
    if?: string;
    // Keys should be unique in the entire workflow
    key?: string;
    parallelism?: number;
    plugins?: Array<{ [pluginName: string]: unknown }>
    priority?: number
    retry?: { 'automatic': AutomaticRetry } | { 'manual': ManualRetry }
    skip?: boolean | string;
    timeout_in_minutes?: number;
}>

class Plugin<T = {}> implements JSONSerialization<{ [pluginName: string]: T}> {
    constructor(public name: string, public config: T) {}
    toJSON() {
        return {
            [this.name]: this.config
        }
    }
}

const cachePlugin = new Plugin('nam', { hello: 'hello'})

/** 
 * Command Step
*/
export class CommandStep extends BaseStep implements JSONSerialization<CommandStepShape> {

public plugins = new ChainableList<CommandStep, { [pluginName: string]: unknown }, Plugin>(this)
private _commands: Array<string> = [];
private _label: string | undefined = undefined;
private _agent: { [agentKey: string]: string };
// withArtifacts <-- DONE
private _artifact_paths: Set<string> = new Set();
// withBranches
private _branches?: string;
private _cancel_on_build_failing?: boolean;
// withConcurrency(limit: number, group?: string)
private _concurrency?: number;
private _concurrency_group?: string;
// withEnv({ ...key/value})
private _env?: Map<string, string>
private _if?: string;

private _parallelism?: number;
// withPlugin(plugin)
private _plugins?: Map<string, unknown>
private _priority?: number
// withRetry
private _retry?: { automatic: AutomaticRetry } | { manual: ManualRetry }
private _skip?: boolean | string;
// withTimeout
private _timeout_in_minutes?: number;


    constructor(command: string, label?: string);
    constructor(commands: Array<string>, label?: string);
    constructor(command: string | Array<string>, label?: string) {
        super();
        this._commands = Array.isArray(command) ? command : [command]
        this._label = label;
    }


    addCommands(...commands: Array<string>) {
        this._commands.push(...commands);
        return this;
    }

    private _setAgent(key: string, value: string) {
        if (!this._agent) {
            this._agent = {}
        }
        this._agent[key] = value;
    }

    withQueue(queue: string) {
        this._setAgent('queue', queue)
        return this;
    }

    withAgent(key: string, tag: string) {
        /**
         * agent keys of queue are treated differently with than just general tagged agents
         */
         this._setAgent(key, tag)
        return this;
    }

    withArtifacts(...paths: Array<string>) {
        paths.forEach(path =>  this._artifact_paths.add(path));
        return this;
    }

    withConcurrency(limit: number, group: string) {
        this._concurrency = limit;
        this._concurrency_group = group;
        return this;
    }

    /**
     * Set the timeout of the command step
     * 
     * @param timeout -- The max time, in minutes, the job will run before failing automatically
     */
    withTimeout(timeout: number) {
        this._timeout_in_minutes = timeout;
        return this;
    }

    withRetry(retryType: 'automatic', config:  AutomaticRetry);
    withRetry(retryType: 'manual', config: ManualRetry)
    withRetry(retryType: unknown, config: unknown) {
        if (retryType === 'manual') {
            this._retry = {
                [retryType as 'manual']: config as ManualRetry
            }
        } else {
            this._retry = {
                [retryType as 'automatic']: config as AutomaticRetry
            }
        }
        return this;
    }

    toJSON() {
        return pruneJSON({
            ...super.toJSON(),
            commands: this._commands,
            label: this._label,
            agent: this._agent,
            concurrency: this._concurrency,
            plugins: this.plugins.toJSON(),
            concurrency_group: this._concurrency_group,
            timeout_in_minutes: this._timeout_in_minutes,
            artifact_paths: Array.from(this._artifact_paths)
        })
    }
}


const c = new CommandStep('asdf');
c
    .plugins.add(new Plugin('hello', { hello: 'hello'}))
    .withRetry('automatic',  { exit_status: '*'})
