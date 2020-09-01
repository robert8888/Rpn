import {IProcess, Traceable} from "../../../../Process/Process";
import {IExpression} from "../../../../Expression/Expression";
import {data} from "../../../../Processor/Processor";
import {TokenTypes} from "../../tokens/Token";
import {ExpressionBuilder} from "../../../../Expression/ExpressionBuilder";
import {ValidationError} from "../Validator";

export default class FunctionBrackets extends Traceable implements IProcess {
    public run(input: data) {
        input = <IExpression>input;
        return FunctionBrackets.check(input);
    }

    private static check(input: IExpression) {
        const tokens = input.tokens;
        for (let i = 0; i < tokens.length; i++) {
            const current = tokens[i];
            const next = tokens[i + 1];

            const test =
                current.type === TokenTypes.Function &&
                (next && next.type !== TokenTypes.Bracket || !next);

            if (test) {
                const position = current.position?.original || 0;
                ExpressionBuilder.pushError(input, new ValidationError(
                    "FunctionBracketMiss",
                    "Each function has to have values in brackets. Miss bracket at position: " + position,
                    position
                ))
            }
        }
        return input;
    }
}