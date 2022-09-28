

import Ajv from "ajv"
import test from 'ava';
import { CommandStep, Pipeline } from '../src';
const schema = require('./schema.json');
const draft6MetaSchema = require("ajv/dist/refs/json-schema-draft-06.json")



test('simple schema', t => {
    const ajv = new Ajv({
        strictSchema: false
    })
    ajv.addMetaSchema(draft6MetaSchema)


    const validate = ajv.compile(schema)
    const pipeline = new Pipeline('pipeline')
    const step = new CommandStep('command')
    pipeline.addSteps(step);
    t.is(validate(pipeline.toJSON()), true)
})


test('complicated schema', t => {
    const ajv = new Ajv({
        strictSchema: false
    })
    ajv.addMetaSchema(draft6MetaSchema)


    const validate = ajv.compile(schema)
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
    const keys = buildAndInstall.key as string;
    const test = 
        new CommandStep('yarn test', 'test')
            .dependsOn(keys)

    pipeline.addSteps(buildAndInstall, test)
    
    console.log(JSON.stringify(pipeline.toJSON()), validate(pipeline.toJSON()))
    t.is(validate(pipeline.toJSON()), true)

})
