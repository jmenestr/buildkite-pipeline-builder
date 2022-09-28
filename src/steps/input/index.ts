import { BaseInputShape, BaseInputStep } from "../base/BaseInput";
import { BaseStep } from "../base/BaseStep";
import { JSONSerialization } from "../base/serialization";



type InputStepShape = BaseInputShape<{
    input: string;
}>
export class InputStep extends BaseInputStep implements JSONSerialization<InputStepShape> {

    private _input: string;

    constructor(input: string) {
        super();
        this._input = input;
    }
    toJSON() {
        return BaseStep.pruneJson({
            ...super.toJSON(),
            input: this._input,
        })
    }
}

const inputStep = new InputStep('Input data')


inputStep
    .fields.add()
    .fields.add()

