import test from 'ava';
import { GroupStep } from '.';
import { CommandStep } from '../command';


test('group steps', t => {
    const group = new GroupStep('My Group');
    const command = new CommandStep('yarn install');

    group.addStep(command);

    t.like(group.toJSON(), {
        group: 'My Group',
        steps: [
            {
                commands: ['yarn install']
            }
        ]
    })

})