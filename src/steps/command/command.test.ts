import { CommandStep } from "./";
import test from 'ava';

test('CommandStep accepts a single command', t => {
	const install = new CommandStep('yarn install')
    const result = install.toJSON();
    t.like(result, {
        commands: ['yarn install']
    })
});

test('CommandStep accepts an array of commands', t => {
    const install = new CommandStep(['yarn install', 'yarn test'])
    const result = install.toJSON();
    t.like(result, {
        commands: ['yarn install', 'yarn test']
    })
})

test('CommandStep correctly accepts a label', t => {
    const install = new CommandStep('yarn test', 'I am label');
    const result = install.toJSON();
    t.like(result, {
        commands: ['yarn test'],
        label: 'I am label'
    })
})

test('commands can be added with add', t => {
    const install = new CommandStep('yarn test', 'I am label');
    const addedCommand = 'added command';
    install.addCommands(addedCommand)
    const result = install.toJSON();

    t.like(result, {
        commands: ['yarn test', addedCommand]
    })
})

test('can add a new queue by calling withQueue', t => {
    const command = new CommandStep('yarn test');
    command.withQueue('webux')
    const result = command.toJSON();

    t.like(result, {
        agent: { queue: 'webux'}
    })
})


test('can add a new agent tag by calling withAgent', t => {
    const command = new CommandStep('yarn test');
    command.withAgent('postgress', '1.2.3')
    const result = command.toJSON();

    t.like(result, {
        agent: { 'postgress': '1.2.3'}
    })
})

test('can add one artifact path by calling withArtifacts', t => {
    const command = new CommandStep('yarn test');
    command.withArtifacts('/path/to/all/**/*')
    const result = command.toJSON();

    t.like(result, {
        artifact_paths: ['/path/to/all/**/*']
    })
})

test('can add multiple artifact paths by calling withArtifacts', t => {
    const command = new CommandStep('yarn test');
    command.withArtifacts('/path/to/all/**/*', '/all/**/*')
    const result = command.toJSON();

    t.like(result, {
        artifact_paths: ['/path/to/all/**/*', '/all/**/*']
    })
})

test('withArtifacts should only add an artifact path once', t => {
    const command = new CommandStep('yarn test');
    command.withArtifacts('/path/to/all/**/*', '/path/to/all/**/*')
    const result = command.toJSON();

    t.like(result, {
        artifact_paths: ['/path/to/all/**/*']
    })
});


test('withConcurrency should allow you to set a limit and group', t => {
    const command = new CommandStep('yarn test');
    command.withConcurrency(3, 'test-group')
    const result = command.toJSON();

    t.like(result, {
        concurrency: 3,
        concurrency_group: 'test-group'
    })
});


test('dependsOn should allow you to add a key', t => {
    const test = new CommandStep('yarn test')

    test.dependsOn('key')
    const result = test.toJSON();

    t.like(result, {
        depends_on: ['key']
    })
});

test('dependsOn should allow you to add multiple keys', t => {
    const test = new CommandStep('yarn test')

    test.dependsOn('key', 'key2')
    const result = test.toJSON();

    t.like(result, {
        depends_on: ['key', 'key2']
    })
});

test('dependsOn should not allow you to add more than one of the same key', t => {
    const test = new CommandStep('yarn test')

    test.dependsOn('key', 'key')
    const result = test.toJSON();

    t.like(result, {
        depends_on: ['key']
    })
});

test('withTimeout should allow you to set a timeout for the project', t => {
    const test = new CommandStep('yarn test')

    test.withTimeout(3)
    const result = test.toJSON();

    t.like(result, {
        timeout_in_minutes: 3
    })
});


