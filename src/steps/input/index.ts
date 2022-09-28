import { JSONSerialization } from "../base/serialization";


interface TextFieldShape {}
interface SelectFieldShape {}

interface InputStepShape {
    input: string;
    fields: Array<TextFieldShape | SelectFieldShape>
}

interface TextFieldShape {
    text: string;
    key: string;
    hint?: string;
    required?: boolean;
    default?: string;
}

class TextField implements JSONSerialization<TextFieldShape> {
    private _text: string;
    private _key: string;
    private _hint?: string;
    private _required?: boolean;
    private _default?: string;

    constructor(text: string, key: string) {
        this._text = text;
        this._key = key;
    }
    
    withHint(hint: string) {
        this._hint = hint;
    }

    required(req: boolean) {
        this._required = req;
        return this;
    }

    withDefault(def: string) {
        this._default = def;
        return this;
    }

    toJSON() {
        return {
            text: this._text,
            key: this._key,
            hint: this._hint,
            required: this._required,
            default: this._default,
        }
    }
}


type Option = { 
    label: string;
    value: string;
    hint?: boolean;
    required?: boolean;
    multiple?: boolean;
    default?: string;
};
type SelectFieldShape = {
    select: string;
    key: string;
    options: Array<Option>
    hint?: string;
    required?: boolean;
    default?: string;
} 
class SelectField implements JSONSerialization<SelectFieldShape>{
    private _options: Array<Option> = [];
    private _select: string;
    private _key: string;
    private _hint: string;
    private _required: string;
    private _default: string;

    constructor(prompt: string, key: string) {
        this._select = prompt;
        this._key = key;
    }

    withOptions(...options: Array<Option>) {
        this._options.push(...options);
        return this;
    }

    withHint(hint: string) {
        this._hint = hint;
        return this;
    }

    toJSON() {
        return {} as any;
    }
}

class Fields {
    private _parent: InputStep;
    private _fields: Array<SelectField | TextField>;

    constructor(parent: InputStep) {
        this._parent = parent;
    }

    add(...fields: Array<SelectField | TextField>) {
        this._fields.push(...fields);
        return this._parent
    }


}
class InputStep {

    private _input: string;
    public fields = new Fields(this)
    private _fields: Array<SelectField | TextField> = [];

    withFields(...fields: Array<TextField | SelectField>) {
        this._fields?.push(...fields);
        return this;
    }
}

const inputStep = new InputStep()

inputStep.withFields()

inputStep
    .fields.add()
    .fields.add()

