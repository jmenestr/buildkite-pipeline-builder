import { CommandStep, CommandStepShape } from "./steps/command";
import * as fs from 'fs/promises';
import { GroupStep, GroupStepShape } from "./steps/group";
import { TriggerStepShape } from "./steps/trigger";
import { JSONSerialization } from "./steps/base/serialization";

type Steps = Array<CommandStep | GroupStep | CommandStep> 
type Stringify = (pipelineObject: PipelineShape) => string;

type PipelineShape = {
    steps: Array<CommandStepShape | GroupStepShape | TriggerStepShape>
}
export class Pipeline implements JSONSerialization<PipelineShape> {
    private _steps: Steps = [];
    constructor(public readonly name: string) {}

    addSteps(...steps: Steps ) {
        this._steps.push(...steps);
    }

    toJSON() {
        return {
            steps: this._steps.map(step => step.toJSON())
        }
    }

    async writeFile(path: string, stringifyer: Stringify = JSON.stringify) {
        const pipeline = this.toJSON();
        const stringPipeline = stringifyer(pipeline);
        return await fs.writeFile(path, stringPipeline);
    }

}

