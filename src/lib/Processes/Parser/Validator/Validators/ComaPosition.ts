import {IProcess, Traceable} from "../../../../Process/Process";
import {ExpressionError, IExpression} from "../../../../Expression/Expression";
import {data} from "../../../../Processor/Processor";
import {IFunctionalToken, Token, TokenTypes} from "../../tokens/Token";
import {BracketVariant, IBracketToken} from "../../tokens/special/Bracket";
import {ExpressionBuilder} from "../../../../Expression/ExpressionBuilder";
import {IPosition} from "../../tokens/Position";
import {ValidationError} from "../Validator";


export default class ComaPosition extends Traceable implements IProcess {
    public run(input: data) {
        return this.check(<IExpression>input);
    }

    private check(input: IExpression) {
        input.tokens.forEach((token, index) => {
            if (token.type !== TokenTypes.Separator) return;

            const bracketStack = new Array<Token>();
            const comaStack = new Array<Token>();

            for (let i = index - 1; i >= 0; i--) {
                if (i === 0) {
                    ComaPosition.error(input, token.position)
                }

                let current = input.tokens[i];
                if (current.type === TokenTypes.Separator) {
                    comaStack.push(current);
                    continue;
                }
                if (current.type !== TokenTypes.Bracket) continue;

                if ((<IBracketToken>current).variant === BracketVariant.Close) {
                    bracketStack.push(current);
                } else {
                    if (bracketStack.length) {
                        bracketStack.pop();
                    } else {
                        const prev = input.tokens[i - 1];
                        if (prev && prev.type === TokenTypes.Function && (<IFunctionalToken>prev).argLength >= 2) {
                            comaStack.pop();
                            if (!comaStack.length) {
                                break;
                            }
                        } else {
                            ComaPosition.error(input, token.position);
                        }
                    }
                }
            }
        })
        return input;
    }

    private static error(expression: IExpression, position: IPosition | undefined) {
        const _position = position?.original || 0;
        ExpressionBuilder.pushError(expression, new ValidationError(
            "ComaPosition",
            `Not correct separator position: ${_position + 1} (Coma). It should be placed in function with two arguments`,
            _position
        ));
    }
}