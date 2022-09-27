import { CommandStep } from "./steps/command";
import * as fs from 'fs/promises';
import { GroupStep } from "./steps/group";

type Steps = Array<CommandStep | GroupStep | CommandStep> 
type Stringifyer = (pipelineObject: object) => string;
export class Pipeline {
    private steps: Steps = [];
    constructor(public readonly name: string) {}

    addSteps(...steps: Steps ) {
        this.steps.push(...steps);
    }

    toJSON() {
        return {
            steps: this.steps.map(step => step.toJSON())
        }
    }

    async writeFile(path: string, stringifyer: Stringifyer = JSON.stringify) {
        const pipeline = this.toJSON();
        const stringPipeline = stringifyer(pipeline);
        return await fs.writeFile(path, stringPipeline);
    }

}

