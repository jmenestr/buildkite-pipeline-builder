

import Ajv, {JSONSchemaType} from "ajv"
import test from 'ava';
import { CommandStep, Pipeline } from '../src';
const schema = require('./schema.json');
const draft6MetaSchema = require("ajv/dist/refs/json-schema-draft-06.json")


test('schema', t => {
    const ajv = new Ajv({
        strictSchema: false
    })
    ajv.addMetaSchema(draft6MetaSchema)


    const validate = ajv.compile(schema)
    const pipeline = new Pipeline('pipeline')
    const step = new CommandStep('command')
    pipeline.addSteps(step);
    t.is(validate({}), true)
})
