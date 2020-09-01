import {IProcess, Traceable} from "../../../../Process/Process";
import {IExpression} from "../../../../Expression/Expression";
import {data} from "../../../../Processor/Processor";
import {IFunctionalToken, Token, TokenTypes} from "../../tokens/Token";
import {BracketVariant, IBracketToken} from "../../tokens/special/Bracket";
import {ExpressionBuilder} from "../../../../Expression/ExpressionBuilder";
import {ValidationError} from "../Validator";
import Stack from "../../../../Utils/Stack";

export default class FunctionArguments extends Traceable implements IProcess {
    public run(input: data) {
        input = <IExpression>input;
        return FunctionArguments.check(input);
    }

    private static check(input: IExpression) {
        let tokens = input.tokens;

        function pushError(i: number, argLength: number) {
            const origin = tokens[i].origin;
            const position = tokens[i].position?.original || 0;
            ExpressionBuilder.pushError(input, new ValidationError(
                "FunctionArguments",
                `Function ${origin} expect to have ${argLength} arguments`,
                position
            ))
        }

        for (let i = 0; i < tokens.length; i++) {
            const current = tokens[i];
            if (current.type !== TokenTypes.Function) {
                continue;
            }

            if ((<IFunctionalToken>current).argLength === 1) {
                const stack = new Stack<Token>();
                for(let k = i + 1; k < tokens.length; k++){
                    let current = tokens[k];
                    if(current.type === TokenTypes.Bracket){
                        if((<IBracketToken>current).variant === BracketVariant.Open){
                            stack.push(current);
                        } else {
                            while(!stack.isEmpty && stack.top.type === TokenTypes.Bracket){
                                stack.pop();
                            }
                            if(stack.isEmpty){
                                pushError(i, 1);
                            }
                            break;
                        }
                    } else {
                        stack.push(current);
                    }
                }
            } else { // two an more arguments
                const argLength = (<IFunctionalToken>current).argLength;
                const stack = new Stack<Token>();
                let args = 1;

                for (let k = i; k < tokens.length; k++) {
                    const current = tokens[k];

                    if (current.type === TokenTypes.Separator) {
                        stack.push(current);
                    } else if (current.type === TokenTypes.Bracket) {
                        if ((<IBracketToken>current).variant === BracketVariant.Open) {
                            stack.push(current);
                        } else {
                            while (!stack.isEmpty && stack.top.type === TokenTypes.Separator) {
                                stack.pop();
                                args++;

                            }
                            stack.pop();

                            if (!stack.length) {
                                if (args !== argLength) {
                                    pushError(i, argLength);
                                }
                                break;
                            }
                        }
                    }
                }
            }
        }

        return input;
    }
}