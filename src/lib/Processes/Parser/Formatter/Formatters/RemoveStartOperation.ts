import {IProcess, Traceable} from "../../../../Process/Process";
import {IExpression} from "../../../../Expression/Expression";
import {data} from "../../../../Processor/Processor";
import {IFunctionalToken, TokenTypes} from "../../tokens/Token";
import {ExpressionBuilder} from "../../../../Expression/ExpressionBuilder";

export default class RemoveStartOperation extends Traceable implements IProcess {
    public run(input: data) {
        input = <IExpression>input;
        return RemoveStartOperation.removeSpacers(input);
    }

    private static removeSpacers(input: IExpression) {
        let first = <IFunctionalToken>input.tokens[0]
        if (first && first.type === TokenTypes.Operation && first.argLength == 2) {
            return ExpressionBuilder.removeToken(input, 0);
        }
        return input;
    }
}