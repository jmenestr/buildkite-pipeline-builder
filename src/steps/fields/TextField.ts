import { JSONSerialization } from "../base/serialization";

interface TextFieldShape {}

export interface TextFieldShape {
    text: string;
    key: string;
    hint?: string;
    required?: boolean;
    default?: string;
}

export class TextField implements JSONSerialization<TextFieldShape> {
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
