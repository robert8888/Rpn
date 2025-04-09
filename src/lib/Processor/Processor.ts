import {IExpression} from "../Expression/Expression";
import {IProcess} from "../Process/Process";


export type data = string | IExpression;

export interface IProcessor {
    compute: (input: any) => any;
    use: (extension : (IProcess | ((processor: IProcessor) => void)), getPosition?: (race : Array<string>) => number) => Processor;
    exclude: (processId: string) => void;
    extend: (processId: string, transform: (process: IProcess) => IProcess)  => void;
    readonly race: Array<string>;
    readonly partial: Array<data>;
}

export default class Processor implements IProcessor {
    [key: string]: IProcess | any;
    private processes = new Map<string, IProcess>();
    private _race = Array<string>();
    private _partials = Array<data>();

    get race(){return this._race};

    get partial(){return this._partials};

    use(extension: (IProcess | ((processor: IProcessor) => void)),
        getPosition?: (race: Array<string>) => number){
        if(typeof extension === "function"){
            extension(<IProcessor>this);
            return this;
        }
        const process = <IProcess>extension;
        if(getPosition){
            const position = getPosition(this._race);
            this._race.splice(position, 0 , process.id);
        }
        this._race.push(process.id);
        this.processes.set(process.id, process);
        const that = this;
        Object.assign(this, {
            get [process.id](){
               return that.processes.get(process.id);
            },
        })
        return this;
    }

    exclude(processId: string){
        this._race = this._race.filter( id => id !== processId);
        this.processes.delete(processId);
    }

    extend(processId: string, transform: (process: IProcess) => IProcess){
        const process = this.processes.get(processId);
        if(!process){
            throw new RangeError(`Processor error. Process of given id: ${processId} don't exist in current configuration`)
        }
        const transformed = transform(process);
        if(transformed.id !== process.id){
            throw new Error(`Id of process has to stay the same`)
        }
        this.processes.set(processId, transformed);
    }

    compute(input: any){
        this.partials = new Array<data>();
        let current = input;
        for(let processId of this._race){
            const process = this.processes.get(processId);
            if(!process) break;
            const output = process.run(current);
            this._partials.push(output);
            current = output;
        }
        return current;
    }
}
