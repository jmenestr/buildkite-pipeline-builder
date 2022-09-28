import test from 'ava';
import { TriggerStep } from '.';

test('should correctly infer the trigger target from the constructor', t => {
    const triggerTarget = 'some-trigger-target'
    const trigger = new TriggerStep(triggerTarget);

    const result = trigger.toJSON();
    t.like(result, {
        trigger: triggerTarget
    })

});

test('should correctly infer the label when passed into the constructor', (t) => {
    const triggerTarget = 'some-trigger-target'
    const label = 'some-label'
    const trigger = new TriggerStep(triggerTarget, label);

    const result = trigger.toJSON();
    t.like(result, {
        trigger: triggerTarget,
        label
    })
});

test('withBranches should correctly capture passed in branches', t => {
    const triggerTarget = 'some-trigger-target'
    const trigger = new TriggerStep(triggerTarget);

    const branches = 'main feature/*'
    trigger.withBranches(branches)

    const result = trigger.toJSON();
    t.like(result, {
        trigger: triggerTarget,
        branches
    })
});
test('async should correctly infer passed in value', t => {
    const triggerTarget = 'some-trigger-target'
    const trigger = new TriggerStep(triggerTarget);

    trigger.async(true)

    const result = trigger.toJSON();
    t.like(result, {
        trigger: triggerTarget,
        async: true
    })
});
test('if should correctly infer passed in value', t => {
    const triggerTarget = 'some-trigger-target'
    const trigger = new TriggerStep(triggerTarget);

    const condition = 'branch == main'
    trigger.if(condition)

    const result = trigger.toJSON();
    t.like(result, {
        trigger: triggerTarget,
        if: condition
    })
});

test('skip should correctly infer passed in value', t => {
    const triggerTarget = 'some-trigger-target'
    const trigger = new TriggerStep(triggerTarget);

    const skip = 'some message'
    trigger.skip(skip)

    const result = trigger.toJSON();
    t.like(result, {
        trigger: triggerTarget,
        skip
    })
});

test('should be able to set build params in a chainable manner', t => {
    const triggerTarget = 'some-trigger-target'
    const trigger = new TriggerStep(triggerTarget);
    const branch = 'main'
    const env = { key: 'value'}
    
    trigger
        .build.withBranch(branch)
        .build.withEnv('key', 'value')
        .build.withCommit('commit')
        .build.withMessage('message')
        .build.withMetaData('key', 'value')

    const result = trigger.toJSON();
    t.like(result, {
        trigger: triggerTarget,
        build: {
            branch,
            env,
            commit: 'commit',
            message: 'message',
            meta_data: {
                key: 'value'
            }
        }
    })
})

test('dependsOn should accept one key', t => {
    const triggerTarget = 'some-trigger-target'
    const trigger = new TriggerStep(triggerTarget);

    trigger.dependsOn('key')
    t.like(trigger.toJSON(), {
        depends_on: ['key']
    })
});

test('dependsOn should accept more than one key', t => {
    const triggerTarget = 'some-trigger-target'
    const trigger = new TriggerStep(triggerTarget);

    trigger.dependsOn('key', 'key2')
    t.like(trigger.toJSON(), {
        depends_on: ['key', 'key2']
    })
})
test('dependsOn should should not duplicate keys', t =>{
    const triggerTarget = 'some-trigger-target'
    const trigger = new TriggerStep(triggerTarget);

    trigger.dependsOn('key', 'key')
    t.like(trigger.toJSON(), {
        depends_on: ['key']
    })
})
