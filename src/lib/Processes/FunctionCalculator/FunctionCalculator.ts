import {IExpression, isExpression} from "../../Expression/Expression";
import Calculator from "../Calculator/Calculator";
import Substitutor from "./Substitutor/Substitutor";
import Processor from "../../Processor/Processor";

type ArgsRange = {
    variables: [{name: string, from: number, to: number}];
    resolution: number
}

type ArgsArray = {[key:string]: number}[]

export type ArgsInput = ArgsArray | ArgsRange

export default class FunctionCalculator extends Processor {
    constructor() {
        super();
        this.use(new Substitutor());
        this.use(new Calculator());
    }

    private computeArgs(range: ArgsRange): ArgsArray {
        const args = new Array<{ [key: string]: number }>();
        for (let i = 0; i < range.resolution; i++) {
            let values = <{ [key: string]: number }>{}
            for (let variable of range.variables) {
                values[variable.name] = variable.from + ((variable.to - variable.from) / (range.resolution - 1)) * i
            }
            args.push(values)
        }
        return args;
    }

    public valuesOf(input: IExpression, args: ArgsInput){
        const results = new  Array<number | boolean | null>();
        if(!(args instanceof Array)){
            args = this.computeArgs(args);
        }
        for(let values of args){
            this.Substitutor.values = values;
            const expression = <IExpression>this.compute(input);
            results.push(expression.value);
        }
        //clearing
        this.Substitutor.clear();
        this.compute(input);

        return results
    }
}