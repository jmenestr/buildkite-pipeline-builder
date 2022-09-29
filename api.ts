import { InputStep } from '../src';
import { SelectField } from '../src/steps/fields/SelectField';
import { TextField } from '../src/steps/fields/TextField';

const releaseInput = new InputStep('Release Input');

const projectNameInput = new TextField('Project name', 'project');
projectNameInput
    .required(true)
    .withDefault('user-portal');

const selectVersion = new SelectField('Version', 'version');


releaseInput
    .fields.add(projectNameInput)
    .fields.add(selectVersion)
    .withPrompt("Please fill in the following to release")