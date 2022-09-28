import { UniqueChainableList } from "../fields";
import { SelectField, SelectFieldShape } from "../fields/SelectField";
import { TextField, TextFieldShape } from "../fields/TextField";
import { StepShape, BaseStep } from "./BaseStep";
import { JSONSerialization } from "./serialization";

export type BaseInputShape<T = {}> = StepShape<{
    prompt?: string;
    fields?: Array<TextFieldShape | SelectFieldShape>;
    branches?: string;
    if?: string;
} & T>

export class BaseInputStep extends BaseStep implements JSONSerialization<BaseInputShape> {
    private _prompt?: string;
    public fields = new UniqueChainableList<typeof this, TextField | SelectField>(this, 'key')
    private _branches?: string;
    private _if?: string;
    
    withPrompt(prompt: string) {
        this._prompt = prompt;
        return this;
    }

    if(condition: string) {
        this._if = condition;
        return this;
    }

    withBranches(branches: string) {
        this._branches = branches;
        return this;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            fields: this.fields.toJSON(),
            prompt: this._prompt,
            branches: this._branches,
            if: this._if
        }
    }
}
