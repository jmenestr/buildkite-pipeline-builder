
import { JSONSerialization } from "./serialization";


export class ChainableList<P, R, L extends JSONSerialization<R>> implements JSONSerialization<Array<R>> {
    private _parent: P;
    private _list: Array<L> = [];
    private _unique_key?: keyof L;
    private _currentKeys: Set<String> = new Set();

    constructor(parent: P, uniqueKey?: keyof L) {
        this._parent = parent;
        this._unique_key = uniqueKey;
    }

    private assertValidKeys(item: L) {
        if (!this._unique_key || !item[this._unique_key]) return;

        if (this._currentKeys.has(item[this._unique_key] as string)) {
            // TODO: Make this error better by displaying the two fields that have the same key
            const listItemInstance = (item as any).name;
            throw new Error(
                `
                You cannot have multiple ${listItemInstance} with the key ${String(this._unique_key)}. 
                Please ensure that the property ${String(this._unique_key)} is unique.
                `
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
        return this._list.map(item => item.toJSON())
    }
}
