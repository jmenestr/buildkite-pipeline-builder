

import Ajv from "ajv"
import test from 'ava';
import { CommandStep, Pipeline } from '../src';
const schema = require('./schema.json');
const draft6MetaSchema = require("ajv/dist/refs/json-schema-draft-06.json")

const ajv = new Ajv({
    strictSchema: false
})
ajv.addMetaSchema(draft6MetaSchema)
const validate = ajv.compile(schema)

test('simple schema', t => {

    const pipeline = new Pipeline('pipeline')
    const step = new CommandStep('command')
    pipeline.steps.add(step);
    t.is(validate(pipeline.toJSON()), true)
})


test('complicated schema', t => {
    const pipeline = new Pipeline('test-pipeline')

    const buildAndInstall = new CommandStep(
        ['yarn install', 'yarn build'],
        'build-install-deploy'
    )
        .addCommands('yarn deploy')
        .withKey('build-install-deploy')
    
    /**
     * TODO: Make this API a big easier to use.
     */
    const keys = buildAndInstall.key;
    const test = 
        new CommandStep('yarn test', 'test')
            .dependsOn(keys)

    pipeline.steps.add(buildAndInstall, test)
    
    t.is(validate(pipeline.toJSON()), true)

})
