import {IProcess, Traceable} from "../../../../Process/Process";
import {Token, TokenTypes} from "../../tokens/Token";
import {IExpression} from "../../../../Expression/Expression";
import {data} from "../../../../Processor/Processor";
import Multiplication from "../../tokens/operations/Multiplication";
import {ExpressionBuilder} from "../../../../Expression/ExpressionBuilder";
import {default as NumberToken} from "./../../tokens/special/Number"
import Bracket, {BracketVariant} from "../../tokens/special/Bracket";

export default class InjectMultiplicationByNegation extends Traceable implements IProcess {
    public run(input: data) {
        input = <IExpression>input;
        return InjectMultiplicationByNegation.injectMultiplication(input);
    }


    private static injectMultiplication(input: IExpression) {
        let occurrence = InjectMultiplicationByNegation.findPattern(input.tokens);
        if (!occurrence.length) return input;

        let output = input;
        const multiplication = new Multiplication();
        const one = new NumberToken(-1);
        for (let place of occurrence) {
            output = ExpressionBuilder.removeToken(output, place);
            output = ExpressionBuilder.injectToken(output, multiplication, "*", place)
            output = ExpressionBuilder.injectToken(output, one, "-1", place);

        }

        return output;
    }

    private static findPattern(tokens: Token[]) {
        const positions = new Array<number>();
        for (let i = 0; i < tokens.length - 1; i++) {
            const prev = tokens[i - 1];
            const current = tokens[i];
            const next = tokens[i + 1];

            const divisionByNegative =
                (prev && prev.id === "Division") && current.id === "Subtraction";

            const multiplicationByNegative =
                (prev && prev.id === "Multiplication") && current.id === "Subtraction";

            const negativeFunction =
                current.id === "Subtraction"
                && (!prev || (prev.type === TokenTypes.Bracket && (<Bracket>prev).variant === BracketVariant.Open))
                && next.type === TokenTypes.Function

            const test = divisionByNegative || multiplicationByNegative || negativeFunction;
            if (test) {
                positions.push(i + positions.length);
            }
        }
        return positions;
    }
}