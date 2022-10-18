import { JSONSerialization } from "./serialization";

/**
 * TODO: Implement softFail
 */
export type ExitStatus = "*" | number;

interface BaseStepShape {
    // softFail?: ExitStatus
    depends_on?: Array<string>;
    allow_dependency_failure?: boolean;
    key?: string;
}

export type StepShape<T> = T & BaseStepShape;
export abstract class BaseStep implements JSONSerialization<BaseStepShape> {
    private _depends_on: Set<string> = new Set();
    private _allow_dependency_failure?: boolean;
    public key?: string;
    // private _soft_fail?: ExitStatus;

    /**
     * TODO: make this easier to use. I should instead be able to pass
     * commands here that can have a key and I should error out if there's no key avaliable to use.
     */
    dependsOn(...steps: Array<string | undefined>) {
        steps.forEach(step => {
            if (!step) return;
            this._depends_on.add(step)
        })
        return this;
    }

    allowDependencyFailure(allow: boolean) {
        this._allow_dependency_failure = allow;
        return this;
    }

    withKey(key: string) {
        this.key = key;
        return this;
    }
    // softFail(status: ExitStatus) {
    //     this._soft_fail = status;
    //     return this;
    // }

    toJSON() {
        return {
            depends_on: Array.from(this._depends_on),
            // softFail: this._soft_fail,
            key: this.key,
            allow_dependency_failure: this._allow_dependency_failure
        }
    }
}
