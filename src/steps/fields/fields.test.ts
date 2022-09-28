import test from 'ava';
import { Fields } from '.';
import { TextField } from './TextField';

test('add chains the object passed in via the constructor', t => {
    const parent = {};
    const field = new Fields(parent)

    t.is(field.add(), parent);
})

test('returns the correct number of added fields', t => {
    const parent = {};
    const field = new Fields(parent)

    const textFieldOne = new TextField('test', 'keyOne');
    const textFieldTwo = new TextField('test', 'keyTwo');
    field.add(textFieldOne, textFieldTwo)
    t.is(field.toJSON().length, 2);
})

test('should throw an error if provided fields with the same key', t => {
    const parent = {};
    const field = new Fields(parent)

    const textFieldOne = new TextField('test', 'keyOne');
    const textFieldTwo = new TextField('test', 'keyOne');

    t.throws(() => {
		field.add(textFieldOne, textFieldTwo)
	}, {instanceOf: Error}); 
})
