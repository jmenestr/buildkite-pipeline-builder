import { ChainableList } from "../base/chainable-list";
import { JSONSerialization } from "../base/serialization";

function addToJSON<Type>(obj: Type): Type & JSONSerialization<Type> {
    return {
        ...obj,
        toJSON: () => obj
    }
}

export interface OptionShape { 
    label: string;
    value: string;
    hint?: boolean;
    required?: boolean;
    multiple?: boolean;
    default?: string;
};

type Option = OptionShape & JSONSerialization<OptionShape>

export const option = (option: OptionShape) => {
    return addToJSON(option)
}

export type SelectFieldShape = {
    select: string;
    key: string;
    options: Array<OptionShape>
    multiple?: boolean;
    hint?: string;
    required?: boolean;
    default?: string;
} 


export class SelectField implements JSONSerialization<SelectFieldShape>{
    public options = new ChainableList<SelectField, OptionShape, Option>(this, 'value');
    private _select: string;
    private _key: string;
    get key() { return this._key }
    private _hint?: string;
    private _required?: boolean;
    private _default?: string;
    private _multiple?: boolean;

    constructor(select: string, key: string) {
        this._select = select;
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

    multiple(withMultiple: boolean) {
        this._multiple = withMultiple;
        return this;
    }

    toJSON() {
        return {
            select: this._select,
            key: this._key,
            options: this.options.toJSON(),
            hint: this._hint,
            required: this._required,
            multiple: this._multiple,
            default: this._default,
        }
    }
}
