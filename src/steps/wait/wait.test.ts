import test from "ava";
import { WaitStep } from ".";

test('empty wait step only returns ~', t => {
    const wait = new WaitStep();
    t.like(wait.toJSON(),
        {
            wait: "~"
        }
    )
});

test('can correctly add a if condition', t => {
    const wait = new WaitStep();

    wait.if('commit == test')
    t.like(wait.toJSON(),
        {
            wait: "~",
            if: 'commit == test'
        }
    )
})

test('can correctly add a continueOnFailure boolean', t => {
    const wait = new WaitStep();

    wait.continueOnFailure(true)
    t.like(wait.toJSON(),
        {
            wait: "~",
            continue_on_failure: true
        }
    )

    wait.continueOnFailure(false)
    t.like(wait.toJSON(),
        {
            wait: "~",
            continue_on_failure: false
        }
    )
})
