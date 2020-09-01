import {IProcess, Traceable} from "../../Process/Process";
import {data} from "../../Processor/Processor";
import {ExpressionBuilder} from "../../Expression/ExpressionBuilder";
import {IFunctionalToken, isFunctionalToken, Token, TokenTypes} from "../Parser/tokens/Token";
import {IExpression, isExpression} from "../../Expression/Expression";
import {BracketVariant, IBracketToken} from "../Parser/tokens/special/Bracket";
import Stack from "../../Utils/Stack";

export default class Converter extends Traceable implements IProcess {
    public run(input: data){
        if(isExpression(input) && !input.errors){
            return this.convert(input);
        }
        return input;
    }

    private convert(expression : IExpression): IExpression{
        const rpn = new ExpressionBuilder();
        const stack = new Stack<Token>();

        for(let current of expression.tokens){

            if(current.type === TokenTypes.Variable || current.type === TokenTypes.Number){
                rpn.push(current);
            } else if(current.type === TokenTypes.Bracket){
                if((<IBracketToken>current).variant === BracketVariant.Open){
                    stack.push(current)
                } else {
                    while(!stack.isEmpty && stack.top.type !== TokenTypes.Bracket){
                        rpn.push(<Token>stack.pop());
                    }
                    stack.pop(); // opening bracket
                    if(!stack.isEmpty && stack.top.type === TokenTypes.Function){
                        rpn.push(<Token>stack.pop())
                    }
                }
            } else if(current.type === TokenTypes.Separator){
                while(!stack.isEmpty && stack.top.type !== TokenTypes.Bracket){
                    rpn.push(<Token>stack.pop())
                }
            } else if(isFunctionalToken(current)){
                if(!stack.isEmpty && isFunctionalToken(stack.top)){
                    while(!stack.isEmpty){
                        const token = <IFunctionalToken>current;
                        const top = <IFunctionalToken>stack.top;

                        if(token.priority <= top.priority){
                            rpn.push(<Token>stack.pop())
                        } else {
                            break;
                        }
                    }
                }
                stack.push(current);
            }
        }

        while(!stack.isEmpty){
            if(stack.top.type !== TokenTypes.Bracket){
                rpn.push(<Token>stack.pop());
            }
        }

        return rpn.build();
    }
}