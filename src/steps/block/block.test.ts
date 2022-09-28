import test from 'ava';
import { BlockedState, BlockStep } from '.';


test('basic block step', t => {
    const block = new BlockStep('block step');

    t.like(block.toJSON(), {
        block: 'block step'
    })
})

test('block step with key', t => {
    const block = new BlockStep('block step');
    block.withKey('test-key')

    t.like(block.toJSON(), {
        key: 'test-key',
        block: 'block step'
    })
})

test('block with blocked state', t => {
    const block = new BlockStep('block step');
    block
        .blockedState(BlockedState.failed)

    t.like(block.toJSON(), {
        blocked_state: BlockedState.failed
    })

    block
        .blockedState(BlockedState.passed)

    t.like(block.toJSON(), {
        blocked_state: BlockedState.passed
    })

    block
        .blockedState(BlockedState.running)

    t.like(block.toJSON(), {
        blocked_state: BlockedState.running
    })
})

