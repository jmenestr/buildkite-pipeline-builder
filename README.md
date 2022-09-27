# buildkite-pipeline-builder

## Overview

A fluent, chainable pipeline build for constructing Buildkite Pipelines


## Usage

### Creating a new Pipeline

```ts
import { Pipeline } from './Pipeline';

const pipeline = new Pipeline('some-pipeline');


```


### Adding Steps

```ts
import { Pipeline, CommandStep } from './Pipeline';

const pipeline = new Pipeline('some-pipeline');

const install = new CommandStep('yarn install');
install
    .withKey('install')
    .withQueue('webux')

const test = new CommandStep('yarn test');
test
    .withQueue('webux')
    .dependsOn(install.key)


pipeline.add(install, test)


```