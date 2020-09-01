import TokenizersFactory from "../../../src/lib/Plugins/Language/NumeralsToDigit/Tokenizer/TokenizersFactory";
import en from "../../../src/lib/Plugins/Language/dictionaries/en";
import Units from "../../../src/lib/Plugins/Language/NumeralsToDigit/Tokenizer/tokens/numerals/Units";
import Dozens from "../../../src/lib/Plugins/Language/NumeralsToDigit/Tokenizer/tokens/numerals/Dozens";
import Tens from "../../../src/lib/Plugins/Language/NumeralsToDigit/Tokenizer/tokens/numerals/Tens";
import Hundreds from "../../../src/lib/Plugins/Language/NumeralsToDigit/Tokenizer/tokens/numerals/Hundreds";
import Millions from "../../../src/lib/Plugins/Language/NumeralsToDigit/Tokenizer/tokens/numerals/Milions";
import Billions from "../../../src/lib/Plugins/Language/NumeralsToDigit/Tokenizer/tokens/numerals/Billions";

describe("Tokens", ()=>{
    TokenizersFactory.dictionary = en;
    new TokenizersFactory();

    test("Unis @get", ()=>{
        const inputs = ["one", "two", "four", "six", "seven", "eight", "nine", "zero"];
        inputs.forEach(input => {
            let token = Units.get(input, 0);
            expect(token).not.toBeUndefined();
        })
    })

    test("Dozens @get", ()=>{
        const inputs = ["ten", "eleven  ", "twelve ", "thirteen one", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
        inputs.forEach(input => {
            let token = Dozens.get(input, 0);
            expect(token).not.toBeUndefined();
        })
    })

    test("Tens @get", ()=>{
        const inputs = ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
        inputs.forEach(input => {
            let token = Tens.get(input, 0);
            expect(token).not.toBeUndefined();
        })
    })

    test("Hundreds @get", ()=>{
        const input = "Hundred and twenty"
        let token = Hundreds.get(input, 0);
        expect(token).not.toBeUndefined();
    })

    test("Millions @get", ()=>{
        const input = "millions and twenty"
        let token = Millions.get(input, 0);
        expect(token).not.toBeUndefined();
    })

    test("Billions @get", ()=>{
        const input = "Billion and twenty"
        let token = Billions.get(input, 0);
        expect(token).not.toBeUndefined();
    })
})