import {IExpression} from "../../../src/lib/Plugins/Language/NumeralsToDigit/Expression";
import Tokenizer from "../../../src/lib/Plugins/Language/NumeralsToDigit/Tokenizer/Tokenizer";
import TokenizersFactory from "../../../src/lib/Plugins/Language/NumeralsToDigit/Tokenizer/TokenizersFactory";
import en from "../../../src/lib/Plugins/Language/dictionaries/en";
import Space from "../../../src/lib/Plugins/Language/NumeralsToDigit/Tokenizer/tokens/Space";
import Idle from "../../../src/lib/Plugins/Language/NumeralsToDigit/Tokenizer/tokens/Idle";

function testAll(tests: {input:string, values:number[]}[]) {
    TokenizersFactory.dictionary = en;
    const tokenizer = new Tokenizer();

    for (let test of tests) {
        const expression = <IExpression>tokenizer.run(test.input);
        console.log(expression.tokens)
        expression.tokens
            .filter(token => !(token instanceof Space || token instanceof Idle))
            .forEach((token, index) => {
                expect(token.value).toEqual(test.values[index])
            })
    }
}

describe("Language Plugin Tokenizer", () => {

    test("basic numbers", () => {
        const tests = [
           {input: "one", values: [1]},
           {input: "one two three four", values: [1,2,3,4]},
           {input: "745 + one thousand plus twenty two + 456", values: [1,1000,20,2]},
           {input: "two hundreds fifty seven", values: [2, 100, 50, 7]},
        ]
        testAll(tests);
    })

    test("float point numbers", () => {
        const tests = [
            {input: "two hundreds fifty seven five tenth", values: [2, 100, 50, 7, 5, 0.1]},
            {input: "eight hundreds seventy two and seventy one hundredths", values: [8, 100, 70, 2, 70, 1 , 0.01]},
            {input: "one thousand three hundred thousand", values: [1, 1000, 3, 100, 1000]},

        ]
        testAll(tests);
    })
})