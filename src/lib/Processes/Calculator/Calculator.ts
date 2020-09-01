import {IProcess, Traceable} from "../../Process/Process";
import {data} from "../../Processor/Processor";
import {ExpressionError, IExpression, isExpression} from "../../Expression/Expression";
import Stack from "../../Utils/Stack";
import {IFunctionalToken, isFunctionalToken, IValuableToken, TokenTypes} from "../Parser/tokens/Token";
import {ExpressionBuilder} from "../../Expression/ExpressionBuilder";

export default class Calculator extends Traceable implements IProcess {
    public run(input: data){
        if(isExpression(input) && input.errors === undefined){
            return this.compute(input);
        }
        return input;
    }
    
    private compute(input: IExpression){
        const stack = new Stack<number | boolean | null>()

        for(let current of input.tokens){
            if(current.type === TokenTypes.Number || current.type === TokenTypes.Variable){
                const value = (<IValuableToken>current).value;
                stack.push(<number| boolean | null>value)
                if(value === null){
                    break;
                }
            } else if(isFunctionalToken(current)){
                const operation = (<IFunctionalToken>current).value;
                const argLength = (<IFunctionalToken>current).argLength;

                if(typeof operation !== "function") {
                    throw new Error("Expect that value of functional token will be function")
                }

                const args = new Stack<number>();
                for(let i = 0 ; i < argLength; i++){
                    args.push(<number>stack.pop())
                }

                const value = operation(args);


                if(isNaN(<number>value)){
                    const error = new RangeError("Value of operation out of domain")
                    ExpressionBuilder.pushError(input, <ExpressionError>error);
                    throw error;
                }

                stack.push(value);
            }
        }

        const value = stack.pop();
        input.value = value !== undefined ? value : null;
        return input;
    }
}