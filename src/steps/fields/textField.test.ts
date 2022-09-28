import test from 'ava';
import { TextField } from './TextField';

test('basic TextField -- should correctly capture text and key', t => {
    const basicField = new TextField('basic text', 'basic key');

    t.like(basicField.toJSON(), {
        text: 'basic text',
        key: 'basic key'
    })
})


test('TextField  hint -- should correctly be able to set a hint', t => {
    const basicField = new TextField('basic text', 'basic key');

    basicField.withHint('i am hint');
    
    t.like(basicField.toJSON(), {
        text: 'basic text',
        key: 'basic key',
        hint: 'i am hint'
    })
})

test('TextField required -- should correctly be able to set required', t => {
    const basicField = new TextField('basic text', 'basic key');

    basicField.required(true);
    
    t.like(basicField.toJSON(), {
        text: 'basic text',
        key: 'basic key',
        required: true
    })
})

test('TextField default -- should correctly be able to set default value', t => {
    const basicField = new TextField('basic text', 'basic key');

    basicField.withDefault('default');
    
    t.like(basicField.toJSON(), {
        text: 'basic text',
        key: 'basic key',
        default: 'default'
    })
})
