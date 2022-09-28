import { JSONSerialization } from "./serialization";

/**
 * TODO: Implement softFail
 */
export type ExitStatus = "*" | number;

interface BaseStepShape {
    // softFail?: ExitStatus
    dependsOn?: Array<string>;
    allowDependencyFailure?: boolean;
}

export type StepShape<T> = T & BaseStepShape;
export abstract class BaseStep implements JSONSerialization<BaseStepShape> {
    private _depends_on: Set<string> = new Set();
    private _allow_dependency_failure?: boolean;
    // private _soft_fail?: ExitStatus;

    dependsOn(...steps: Array<string>) {
        steps.forEach(step => this._depends_on.add(step));
        return this;
    }

    allowDependencyFailure(allow: boolean) {
        this._allow_dependency_failure = allow;
        return this;
    }

    // softFail(status: ExitStatus) {
    //     this._soft_fail = status;
    //     return this;
    // }

    static pruneJson<T extends {}>(json: T) {
        Object.keys(json).forEach(key => {
            if (json[key] === undefined) {
                delete json[key]
            }

            if (Array.isArray(json[key]) && json[key].length === 0) {
                delete json[key]
            }
        })
        return json;
    }
    toJSON() {
        return {
            dependsOn: Array.from(this._depends_on),
            // softFail: this._soft_fail,
            allowDependencyFailure: this._allow_dependency_failure
        }
    }
}