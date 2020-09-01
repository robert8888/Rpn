import {IExpression} from "../../../src/lib/Plugins/Language/NumeralsToDigit/Expression";
import Tokenizer from "../../../src/lib/Plugins/Language/NumeralsToDigit/Tokenizer/Tokenizer";
import TokenizersFactory from "../../../src/lib/Plugins/Language/NumeralsToDigit/Tokenizer/TokenizersFactory";
import en from "../../../src/lib/Plugins/Language/dictionaries/en";
import Space from "../../../src/lib/Plugins/Language/NumeralsToDigit/Tokenizer/tokens/Space";
import Idle from "../../../src/lib/Plugins/Language/NumeralsToDigit/Tokenizer/tokens/Idle";
import Converter from "../../../src/lib/Plugins/Language/NumeralsToDigit/Converter/Converter";

describe("Language Plugin Tokenizer", () => {
    TokenizersFactory.dictionary = en;
    const tokenizer = new Tokenizer();
    const converter = new Converter();

    test("basic numbers", () => {
        const tests = [
            {input: "one", values: [1]},
            {input: "one two three four", values: [1,2,3,4]},
            {input: "twenty one", values: [21]},
            {input: "two hundreds fifty seven", values: [257]},
            {input: "thirteen millions and four hundred thousands seven hundreds fifty seven", values: [13400757]},
        ]
        for(let test of tests){
            let expression = <IExpression>tokenizer.run(test.input);
            console.log(expression.tokens)
            expression = <IExpression>converter.run(expression);
            console.log(expression.tokens)
            expression.tokens.filter(token => !(token instanceof Space || token instanceof Idle) )
                .forEach((token, index) => {
                    expect(token.value).toEqual(test.values[index])
                })
        }
    })
})