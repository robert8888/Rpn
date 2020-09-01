import {IProcess, Traceable} from "../../../../Process/Process";
import {IExpression} from "../../../../Expression/Expression";
import {data} from "../../../../Processor/Processor";
import {BracketVariant, IBracketToken} from "../../tokens/special/Bracket";
import {TokenTypes} from "../../tokens/Token";
import {ExpressionBuilder} from "../../../../Expression/ExpressionBuilder";
import {ValidationError} from "../Validator";

export default class BracketMismatch extends Traceable implements IProcess {
    public run(input: data) {
        const output = BracketMismatch.check(<IExpression>input);
        if(!output){ return input; }
        return output;
    }

    private static check(input: IExpression) {
        const stacks = new Map<string, IBracketToken[]>();
        for(let token of input.tokens){
            if(token.type !== TokenTypes.Bracket) continue;
            const bracket = <IBracketToken>token;
            if(bracket.variant === BracketVariant.Open){
                let current = stacks.get(bracket.subtype) || new Array<IBracketToken>();
                current.push(bracket);
                stacks.set(bracket.subtype, current);
            } else {
                let current = stacks.get(bracket.subtype) || new Array<IBracketToken>();
                if(!current.length){
                    //error - not opened
                    const _position =  bracket.position?.original || 0;
                    ExpressionBuilder.pushError(input, new ValidationError(
                        "BracketMismatch",
                        `Incorrect sequence of brackets. Each closing
                         bracket has to be preceded by opening. At position ${_position}`,
                         _position
                    ))
                }
                current.pop();
                stacks.set(bracket.subtype, current);
            }
        }

        for(let [, stack] of stacks.entries()){
            if(stack.length){
                //error - not closed
                const bracket = stack.pop();
                if(!bracket) return;
                const _position =  bracket.position?.original || 0;
                ExpressionBuilder.pushError(input, new ValidationError(
                    "BracketMismatch",
                    `Incorrect sequence of brackets. Bracket on position ${_position + 1} must be closed`,
                    _position
                ))
            }
        }

        return input;
    }

}