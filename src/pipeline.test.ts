import { Pipeline } from "./Pipeline";
import test from 'ava';

test('Pipeline constructor should set a name', t => {
	const p = new Pipeline('pipeline name')
    t.is(p.name, 'pipeline name')
});