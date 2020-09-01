import {IProcess, Traceable} from "../../../../Process/Process";
import {IExpression} from "../../../../Expression/Expression";
import {data} from "../../../../Processor/Processor";
import {TokenTypes} from "../../tokens/Token";
import {BracketVariant, IBracketToken} from "../../tokens/special/Bracket";
import {ExpressionBuilder} from "../../../../Expression/ExpressionBuilder";
import {ValidationError} from "../Validator";

export default class EmptyBrackets extends Traceable implements IProcess {
    public run(input: data) {
        input = <IExpression>input;
        return EmptyBrackets.check(input);
    }

    private static check(input: IExpression) {
        const tokens = input.tokens;
        for (let i = 0; i < tokens.length - 1; i++) {
            const current = tokens[i];
            const next = tokens[i + 1];
            const test =
                current.type === TokenTypes.Bracket && (<IBracketToken>current).variant === BracketVariant.Open
                && next.type === TokenTypes.Bracket && (<IBracketToken>next).variant === BracketVariant.Close;

            if (test) {
                const position = current.position?.original || 0;
                ExpressionBuilder.pushError(input, new ValidationError(
                    "EmptyBracket",
                    `Expression contains empty bracket pattern, at position: ${position}`,
                    position
                ))
            }
        }
        return input;
    }
}