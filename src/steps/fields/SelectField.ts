import { JSONSerialization } from "../base/serialization";

type Option = { 
    label: string;
    value: string;
    hint?: boolean;
    required?: boolean;
    multiple?: boolean;
    default?: string;
};
export type SelectFieldShape = {
    select: string;
    key: string;
    options: Array<Option>
    hint?: string;
    required?: boolean;
    default?: string;
} 

export class SelectField implements JSONSerialization<SelectFieldShape>{
    private _options: Array<Option> = []; // This could be implmeent using the fields as well
    private _select: string;
    private _key: string;
    get key() { return this._key }
    private _hint: string;
    private _required: string;
    private _default: string;

    constructor(select: string, key: string) {
        this._select = select;
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
