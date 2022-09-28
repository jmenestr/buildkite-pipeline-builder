import { pruneJSON } from "../../utils";
import { BaseStep, StepShape } from "../base/BaseStep";
import { JSONSerialization } from "../base/serialization";

type WaitStepShape = StepShape<{
    wait: "~";
    if?: string;
    continue_on_failure?: boolean;
}>

export class WaitStep extends BaseStep implements JSONSerialization<WaitStepShape> {
    private readonly _wait = '~' as const;
    private _if?: string;
    private _continue_on_failure?: boolean;

    if(condition: string) {
        this._if = condition;
        return this;
    }

    continueOnFailure(cof: boolean) {
        this._continue_on_failure = cof;
        return this;
    }

    toJSON() {
        return pruneJSON({
            ...super.toJSON(),
            wait: this._wait,
            if: this._if,
            continue_on_failure: this._continue_on_failure
        })
    }
}
