import { BaseStep, StepShape } from "../base/BaseStep";
import { JSONSerialization } from "../base/serialization";

export type TriggerStepShape = StepShape<{
    trigger: string;
    build?: TriggerStepBuildAttribute;
    label?: string;
    async?: boolean;
    branches?: string;
    if?: string;
    skip?: string | boolean;
}>

interface TriggerStepBuildAttribute {
    message?: string;
    commit?: string; // Default 'HEAD'
    branch?: string;
    meta_data?: { [key: string]: string }
    env?: { [key: string]: string }
}

class Build implements JSONSerialization<TriggerStepBuildAttribute> {
    private _message?: string;
    private _commit?: string; // Default 'HEAD'
    private _branch?: string;
    private _meta_data: { [key: string]: string } = {}
    private _env: { [key: string]: string } = {}

    constructor(private _triggerStep: TriggerStep) {}

    withMessage(message: string) {
        this._message = message;
        return this._triggerStep;
    }

    withCommit(commit: string) {
        this._commit = commit;
        return this._triggerStep;
    }

    withBranch(branch: string) {
        this._branch = branch;
        return this._triggerStep;
    }

    withEnv(key: string, value: string) {
        this._env[key] = value;
        return this._triggerStep;
    }

    withMetaData(key: string, value: string) {
        this._meta_data[key] = value;
        return this._triggerStep;
    }

    // Need to find a general way to prune undefined
    toJSON() {
        return BaseStep.pruneJson({
            message: this._message,
            commit: this._commit,
            branch: this._branch,
            env: this._env,
            meta_data: this._meta_data
        })
    }
}
// Should I slugify this? Pipelines should also be slugged?
export class TriggerStep extends BaseStep implements JSONSerialization<TriggerStepShape> {
    public build: Build = new Build(this);
    private _label?: string;
    private _async?: boolean;
    private _branches?: string;
    private _if?: string;
    private _skip?: string | boolean;

    constructor(private _triggerTarget: string, label?: string) {
        super();
        this._label = label;
    }

    withBranches(branches: string) {
        this._branches = branches;
        return this;
    }

    async(asyncStep: boolean) {
        this._async = asyncStep
        return this;
    }

    if(expression: string) {
        this._if = expression;
        return this;
    }

    skip(shouldSkip: string | boolean) {
        this._skip = shouldSkip;
    }

    toJSON() {
        return BaseStep.pruneJson({
            ...super.toJSON(),
            trigger: this._triggerTarget,
            label: this._label, 
            async: this._async,
            branches: this._branches,
            if: this._if,
            skip: this._skip,
            build: this.build.toJSON()
        });
    }
}

