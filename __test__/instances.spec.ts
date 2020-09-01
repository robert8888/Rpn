import Processor, {IProcessor} from "../src/lib/Processor/Processor";
import Converter from "../src/lib/Processes/Converter/Converter";
import Calculator from "../src/lib/Processes/Calculator/Calculator";
import Parser from "../src/lib/Processes/Parser/Parser";
import TokenFactory from "../src/lib/Processes/Parser/tokens/TokenFactory";
import Sine from "../src/lib/Processes/Parser/tokens/functions/Sine";
import Variable from "../src/lib/Processes/Parser/tokens/special/Variable";
import Summation from "../src/lib/Processes/Parser/tokens/operations/Summation";
import Factorial from "../src/lib/Processes/Parser/tokens/operations/Factorial";
import Subtraction from "../src/lib/Processes/Parser/tokens/operations/Subtraction";


describe("Process instance", () => {
    const converter = new Converter();
    const calculator = new Calculator();
    const parser = new Parser();

    test("processor has methods", () => {
        const processor = new Processor();
        expect(processor).toHaveProperty("compute")
        expect(processor).toHaveProperty("use")
    })

    test("converter has methods", () => {
        expect(converter).toHaveProperty("run")
    })

    test("calculator has methods", () => {
        expect(calculator).toHaveProperty("run")
    })

    test("parser has methods", () => {
        expect(parser).toHaveProperty("compute")
        expect(parser).toHaveProperty("use")
        expect(parser).toHaveProperty("run")
        expect(parser).toHaveProperty("Tokenizer");
        expect(parser.Tokenizer).toHaveProperty("tokens");
    })

    test("Tokens instance check", () => {
        expect(new Subtraction()).toBeInstanceOf(Subtraction);
        expect(new Sine()).toBeInstanceOf(Sine);
        expect(new Variable()).toBeInstanceOf(Variable);

        const tokens = new TokenFactory().produce();
        let selected = ["Summation", "Subtraction", "Factorial"].map(id => tokens.find( token => token.id === id))
        expect(selected[0]).toBeInstanceOf(Summation);
        expect(selected[1]).toBeInstanceOf(Subtraction);
        expect(selected[2]).toBeInstanceOf(Factorial);
    })

});

