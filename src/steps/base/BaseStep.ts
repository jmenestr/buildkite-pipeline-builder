import { JSONSerialization } from "./serialization";

interface BaseStepShape {
    dependsOn?: Array<string>;
    allowDependencyFailure?: boolean;
}

export type StepShape<T> = T & BaseStepShape;
export abstract class BaseStep implements JSONSerialization<BaseStepShape> {
    private _depends_on: Set<string> = new Set();
    private _allow_dependency_failure?: boolean;

    dependsOn(...steps: Array<string>) {
        steps.forEach(step => this._depends_on.add(step));
        return this;
    }

    allowDependencyFailure(allow: boolean) {
        this._allow_dependency_failure = allow;
        return this;
    }

    toJSON() {
        return {
            dependsOn: Array.from(this._depends_on),
            allowDependencyFailure: this._allow_dependency_failure
        }
    }
}