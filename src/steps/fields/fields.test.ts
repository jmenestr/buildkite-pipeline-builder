import test from 'ava';
import { UniqueChainableList } from '.';
import { TextField } from './TextField';

test('add chains the object passed in via the constructor', t => {
    const parent = {};
    type Parent = typeof parent;
    const field = new UniqueChainableList<Parent, { key: string, toJSON: () => any }>(parent, 'key')

    t.is(field.add(), parent);
})

test('returns the correct number of added fields', t => {
    const parent = { key: '' };
    const field = new UniqueChainableList<typeof parent, TextField>(parent, 'key')

    const textFieldOne = new TextField('test', 'keyOne');
    const textFieldTwo = new TextField('test', 'keyTwo');
    field.add(textFieldOne, textFieldTwo)
    t.is(field.toJSON().length, 2);
})

test('should throw an error if provided fields with the same key', t => {
    const parent = {};
    const field = new UniqueChainableList<typeof parent, TextField>(parent, 'key')

    const textFieldOne = new TextField('test', 'keyOne');
    const textFieldTwo = new TextField('test', 'keyOne');

    t.throws(() => {
		field.add(textFieldOne, textFieldTwo)
	}, {instanceOf: Error}); 
})
