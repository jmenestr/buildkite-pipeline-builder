import { pruneJSON } from "../../utils";
import { BaseInputShape, BaseInputStep } from "../base/BaseInput";
import { JSONSerialization } from "../base/serialization";

export enum BlockedState {
    passed = 'passed',
    failed = 'failed',
    running = 'running'
}
export type BlockStepShape = BaseInputShape<{
    block: string;
    blocked_state?: BlockedState

}>
export class BlockStep extends BaseInputStep implements JSONSerialization<BlockStepShape> {

    private _block: string;
    private _blocked_state?: BlockedState;

    constructor(block: string) {
        super();
        this._block = block;
    }

    blockedState(state: BlockedState) {
        this._blocked_state = state;
        return this;
    }
    
    toJSON() {
        return pruneJSON({
            ...super.toJSON(),
            block: this._block,
            blocked_state: this._blocked_state
        })
    }
}
