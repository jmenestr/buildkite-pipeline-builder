import test from 'ava';
import { SelectField } from '../fields/SelectField';
import { TextField } from '../fields/TextField';
import { BaseInputStep } from './BaseInput';


test('base input withPrompt', t => {
    const baseInput = new BaseInputStep();

    baseInput.withPrompt('prompt')

    t.like(
        baseInput.toJSON(), 
        {
            prompt: 'prompt'
        }
    )
})


test('base input -- setting an if condition', t => {
    const baseInput = new BaseInputStep();

    baseInput.if('condition')

    t.like(
        baseInput.toJSON(), 
        {
            if: 'condition'
        }
    )
})

test('base input -- withBranches', t => {
    const baseInput = new BaseInputStep();

    baseInput.withBranches('some branch')

    t.like(
        baseInput.toJSON(), 
        {
            branches: 'some branch'
        }
    )
})

test('should be able to add a new TextField', t => {
    const baseInput = new BaseInputStep();
    const tf = new TextField('Input name', 'name');
    tf
        .withDefault('test User')
        .withHint('Name of the user')

    
    baseInput.fields.add(tf)

    t.like(baseInput.toJSON(), 
        {
            fields: baseInput.fields.toJSON()
        }
    )
})

test('should be able to add a multiple TextField', t => {
    const baseInput = new BaseInputStep();
    const tf = new TextField('Input name', 'name');
    tf
        .withDefault('test User')
        .withHint('Name of the user')
        
    
    baseInput.fields.add(tf)

    t.like(baseInput.toJSON(), 
        {
            fields: [
                {
                    text: 'Input name',
                    key: 'name',
                    hint: 'Name of the user',
                    default: 'test User'
                }
            ]
        }
    )
})
