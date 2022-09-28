import { JSONSerialization } from "../base/serialization";
export class UniqueChainableList<P, L extends JSONSerialization<any>> implements JSONSerialization<Array<L>> {
    private _parent: P;
    private _list: Array<L> = [];
    private _unique_key: keyof L;
    private _currentKeys: Set<String> = new Set();

    constructor(parent: P, uniqueKey: keyof L) {
        this._parent = parent;
        this._unique_key = uniqueKey;
    }

    private assertValidKeys(item: L) {
        if (this._currentKeys.has(item[this._unique_key] as string)) {
            // TODO: Make this error better by dispalying the two fields that have the same key
            throw new Error(
                'Fields for an input or block step cannot have the same value. Please ensure that field keys are unique'
            )
        }
        this._currentKeys.add(item[this._unique_key] as string)
    }

    add(...items: Array<L>) {
        items.forEach(item => this.assertValidKeys(item))
        this._list.push(...items);
        return this._parent;
    }

    
    toJSON() {
        return this._list.map(field => field.toJSON())
    }
}
