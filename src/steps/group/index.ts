import { BaseStep, StepShape } from "../base/BaseStep";
import { JSONSerialization } from "../base/serialization";
import { CommandStep, CommandStepShape } from "../command";
import { TriggerStep, TriggerStepShape } from "../trigger";

type GroupStepShape = StepShape<{
    group: string;
    steps: Array<CommandStepShape | TriggerStepShape>
    key?: string;
    notify?: any;
}>

export class GroupStep extends BaseStep implements JSONSerialization<GroupStepShape> {
    private _steps: Array<CommandStep | TriggerStep> = [];
    private _key?: string;

    constructor(public label: string) {
        super();
    }

    addStep(...steps: Array<CommandStep | TriggerStep>) {
        this._steps.push(...steps);
        return this;
    }

    withKey(key: string) {
        this._key = key;
        return this;
    }

    toJSON() {
        return BaseStep.pruneJson({
            ...super.toJSON(),
            steps: this._steps.map(step => step.toJSON()),
            key: this._key,
            group: this.label
        })
    }
}