import { JSONSerialization } from "../base/serialization";
import { SelectField } from "./SelectField";
import { TextField } from "./TextField";

export class Fields<T> implements JSONSerialization<any> {
    private _parent: T;
    private _fields: Array<SelectField | TextField> = [];

    constructor(parent: T) {
        this._parent = parent;
    }

    add(...fields: Array<SelectField | TextField>) {
        this._fields.push(...fields);
        return this._parent
    }

    toJSON() {
        return this._fields.map(field => field.toJSON())
    }
}
