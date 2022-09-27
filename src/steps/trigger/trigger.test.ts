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
test.todo('withBranches should correctly capture passed in branches');
test.todo('async should correctly infer passed in value');
test.todo('if should correctly infer passed in value');
test.todo('dependsOn should correctly ')