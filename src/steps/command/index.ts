import { BaseStep, StepShape } from "../base/BaseStep";
import { JSONSerialization } from "../base/serialization";

type AutomaticRetry = boolean | {
    exit_status?: '*' | number
    limit: number
}

type ManualRetry = boolean | {
    allowed?: boolean
    permit_on_passed?: boolean
    reason?: string
}

export type CommandStepShape = StepShape<{
    commands: Array<String>;
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
    plugins?: Map<string, unknown>
    priority?: number
    retry?: Map<'automatic', AutomaticRetry> | Map<'manual', ManualRetry>
    skip?: boolean | string;
    timeout_in_minutes?: number;
}>

/** 
 * Command Step
*/
export class CommandStep extends BaseStep implements JSONSerialization<CommandStepShape> {

private _commands: Array<String> = [];
private _label: string | undefined = undefined;
private _agent: { [agentKey: string]: string }  = {}
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
 // Keys should be unique in the entire workflow
private _key?: string;
public get key() { return this._key }

private _parallelism?: number;
// withPlugin(plugin)
private _plugins?: Map<string, unknown>
private _priority?: number
// withRetry
private _retry?: Map<'automatic', AutomaticRetry> | Map<'manual', ManualRetry>
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


    add(command: string) {
        this._commands.push(command);
        return this;
    }

    withQueue(queue: string) {
        this._agent.queue = queue
        return this;
    }

    withAgent(key: string, tag: string) {
        /**
         * agent keys of queue are treated differently with than just general tagged agents
         */
        this._agent[key] = tag
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

    public withKey(key: string /** KeyableStep */) {
        this._key = key;
        return this;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            commands: this._commands,
            label: this._label,
            agent: this._agent,
            concurrency: this._concurrency,
            concurrency_group: this._concurrency_group,
            timeout_in_minutes: this._timeout_in_minutes,
            artifact_paths: Array.from(this._artifact_paths)
        }
    }
}