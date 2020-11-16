import Processor from "./Processor/Processor";
import Parser from "./Processes/Parser/Parser";
import Converter from "./Processes/Converter/Converter";
import Calculator from "./Processes/Calculator/Calculator";
import {IExpression} from "./Expression/Expression";
import FunctionCalculator, {ArgsInput} from "./Processes/FunctionCalculator/FunctionCalculator";


export {default as Processor} from "./Processor/Processor";
export {IProcess} from "./Process/Process";

export default class Rpn extends Processor{
    private computes = new Map<string, IExpression>();
    private lastInput: string | undefined;
    private functionCalculator : FunctionCalculator | undefined;

    //if process are not give then it use default configuration
    constructor(processes: IProcess[] = [new Parser(), new Converter(), new Calculator()]) {
        super();
        processes.forEach((process: IProces) => {
            this.use(process)
        })
    }
    //transform input expression string to expression object
    private expression(input: string): IExpression{
        this.lastInput = input;
        if(!this.computes.has(input)){
            this.computes.set(input, <IExpression>(this.compute(input)))
        }
        return <IExpression>(this.computes.get(input));
    }

    //return value of expression
    public valueOf(input: string): number | boolean | null {
        return (<IExpression>this.expression(input)).value;
    }

    //return values for args array (mathematical function arguments) for computed expression or string expression
    public valuesOf(args: ArgsInput, input?:string | IExpression){
        if(typeof input === "string"){
            input = <IExpression>this.expresion(input);
        }else if(input === undefined){
            input = this.last;
        }
        if(!input){
            throw new Error("Missing expression to calculated. Function valuesOf expect " +
                "second argument if previous calculation has not be executed")
        }

        if(!this.functionCalculator){
            this.functionCalculator = new FunctionCalculator();
        }
        return this.functionCalculator.valuesOf(input, args)
    }

    //return built expression from string mathematical expression to computed
    public expresionFrom(input: string){
        return this.expression(input);
    }

    //return last computed expression
    public get last(): IExpression{
        return <IExpression>this.computes.get(<string>this.lastInput);
    }
    //return value of last computed expression
    public get lastValue(): number | boolean | null {
        return this.last.value;
    }

}
