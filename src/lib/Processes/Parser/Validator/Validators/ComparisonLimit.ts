import {IProcess, Traceable} from "../../../../Process/Process";
import {IExpression} from "../../../../Expression/Expression";
import {data} from "../../../../Processor/Processor";
import {ExpressionBuilder} from "../../../../Expression/ExpressionBuilder";
import {TokenTypes} from "../../tokens/Token";
import {ValidationError} from "../Validator";

export default class ComparisonLimit extends Traceable implements IProcess {
    public run(input: data) {
        input = <IExpression>input;
        return ComparisonLimit.check(input);
    }

    private static check(input: IExpression) {
        const tokens = input.tokens;
        let comparison = 0;
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type === TokenTypes.Comparison) {
                comparison++
            }
        }

        if (comparison > 1) {
            ExpressionBuilder.pushError(input, new ValidationError(
                "ComparisonsLimit",
                "In expression can be only one comparison operation"
            ))
        }

        return input;
    }
}