import {data} from "../Processor/Processor";

export interface ITraceable {
    id: string;
}

export interface IProcess extends ITraceable{
    run: (input: any) => any;
}

export class Traceable implements ITraceable {
    public id = this.constructor.name;
}