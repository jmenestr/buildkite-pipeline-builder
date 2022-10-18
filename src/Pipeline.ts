import { CommandStep, CommandStepShape } from "./steps/command";
import * as fs from 'fs/promises';
import { GroupStep, GroupStepShape } from "./steps/group";
import { TriggerStepShape } from "./steps/trigger";
import { JSONSerialization } from "./steps/base/serialization";
import { ChainableList } from "./steps/base/chainable-list";
import { InputStep } from "./steps";
import { BlockStep, BlockStepShape } from "./steps/block";
import { InputStepShape } from "./steps/input";

type AllowedSteps = CommandStep | GroupStep | CommandStep | InputStep | BlockStep
type Steps = Array<AllowedSteps> 
type Stringify = (pipelineObject: PipelineShape) => string;

type PipelineShape = {
    steps: Array<CommandStepShape | GroupStepShape | TriggerStepShape | InputStepShape | BlockStepShape>
}
export class Pipeline implements JSONSerialization<PipelineShape> {
    public steps = new ChainableList<Pipeline, CommandStepShape | GroupStepShape | TriggerStepShape | InputStepShape | BlockStepShape, AllowedSteps>(this, 'key')
    constructor(public readonly name: string) {}

    toJSON() {
        return {
            steps: this.steps.toJSON()
        }
    }

    async writeFile(path: string, stringifyFn: Stringify = JSON.stringify) {
        const pipeline = this.toJSON();
        const stringPipeline = stringifyFn(pipeline);
        return await fs.writeFile(path, stringPipeline);
    }

}

