import { CommandStep } from "./steps/command";
import * as fs from 'fs/promises';

type Steps = Array<CommandStep>
export class Pipeline {
    private steps: Array<CommandStep> = [];
    constructor(public readonly name: string) {}

    add(...steps: Steps ) {
        this.steps.push(...steps);
    }

    toJSON() {
        return JSON.stringify(
            {
                steps: this.steps.map(step => step.toJSON())
            }
        )
    }

    async writeJSON(path: string) {
        const pipeline = this.toJSON();
        return await fs.writeFile(path, pipeline);
    }

}