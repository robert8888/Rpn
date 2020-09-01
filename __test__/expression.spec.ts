import {ExpressionBuilder} from "../src/lib/Expression/ExpressionBuilder";
import {default as NumberToken} from "../src/lib/Processes/Parser/tokens/special/Number";
import Summation from "../src/lib/Processes/Parser/tokens/operations/Summation";
import Position from "../src/lib/Processes/Parser/tokens/Position";

describe("Expression test", () => {

    test("To string", () => {
        const builder = new ExpressionBuilder();
        builder.push(new NumberToken(1), new Position(0, 1), "1");
        builder.push(new Summation(), new Position(1, 2), "+");
        builder.push(new NumberToken(2), new Position(2, 3), "2");
        const expression = builder.build();
        expect(expression.toString()).toEqual("1 + 2");
    })
});