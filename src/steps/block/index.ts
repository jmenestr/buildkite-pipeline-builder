import { BaseInputShape, BaseInputStep } from "../base/BaseInput";
import { BaseStep } from "../base/BaseStep";
import { JSONSerialization } from "../base/serialization";

export enum BlockedState {
    passed = 'passed',
    failed = 'failed',
    running = 'running'
}
type BlockStepShape = BaseInputShape<{
    block: string;
    key?: string;
    blocked_state?: BlockedState

}>
export class BlockStep extends BaseInputStep implements JSONSerialization<BlockStepShape> {

    private _block: string;
    private _key?: string;
    private _blocked_state?: BlockedState;

    constructor(block: string) {
        super();
        this._block = block;
    }

    withKey(key: string) {
        this._key = key;
    }
    
    toJSON() {
        return BaseStep.pruneJson({
            ...super.toJSON(),
            block: this._block,
            key: this._key,
            blocked_state: this._blocked_state
        })
    }
}
