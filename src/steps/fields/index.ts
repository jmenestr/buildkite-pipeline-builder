import { JSONSerialization } from "../base/serialization";
import { SelectField } from "./SelectField";
import { TextField } from "./TextField";

export class Fields<T> implements JSONSerialization<any> {
    private _parent: T;
    private _fields: Array<SelectField | TextField> = [];

    private _currentKeys: Set<String> = new Set();

    constructor(parent: T) {
        this._parent = parent;
    }

    private assertValidKeys(field: SelectField | TextField) {
        if (this._currentKeys.has(field.key)) {
            // TODO: Make this error better by dispalying the two fields that have the same key
            throw new Error(
                'Fields for an input or block step cannot have the same value. Please ensure that field keys are unique'
            )
        }
        this._currentKeys.add(field.key)
    }

    add(...fields: Array<SelectField | TextField>) {
        fields.forEach(field => this.assertValidKeys(field))
        this._fields.push(...fields);
        return this._parent
    }

    
    toJSON() {
        return this._fields.map(field => field.toJSON())
    }
}
