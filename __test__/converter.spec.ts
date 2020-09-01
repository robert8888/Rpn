import {Processor} from "../src/lib";
import Parser from "../src/lib/Processes/Parser/Parser";
import Converter from "../src/lib/Processes/Converter/Converter";
import {IExpression} from "../src/lib/Expression/Expression";

const testAll = (tests: {input: string, output: string}[]) => {
    const processor = new Processor();
    const parser = new Parser();
    const converter = new Converter();
    processor.use(parser).use(converter);

    for(let test of tests){
        const expression = <IExpression>processor.compute(test.input);
      //  console.log(expression.errors);
        expect(expression.toString()).toEqual(test.output);
    }
}

describe("Rpn converting", () =>{
    test("Basic conversion", () => {
        const tests = [
             {input: "1+2", output: "1 2 +"},
             {input: "1*2+3", output: "1 2 * 3 +"},
             {input: "(3+5)*2", output: "3 5 + 2 *"},
             {input: "1*(3+5*7)*2", output: "1 3 5 7 * + * 2 *"},
             {input: "sin(1deg)+2*cos(2+3*1)*1", output: "1 deg * sin 2 2 3 1 * + cos * 1 * +"},
             {input: "4+5!", output: "4 5 ! +"},
             {input: "5!", output: "5 !"}
        ]
        testAll(tests);
    })

    test("deep nested", () => {
        const tests = [
            {input: "sin(((1+2)*(3+4))*2*(1+2))", output: "1 2 + 3 4 + * 2 * 1 2 + * sin"},
            {input: "(((1+1)*2)*3)", output: "1 1 + 2 * 3 *"},
            {input: "4+5*2*sin(15deg)", output: "4 5 2 * 15 deg * sin * +"},

        ]
        testAll(tests);
    })

    test("comparisons", () => {
        const tests = [
            {input: "2=4", output: "2 4 ="},
            {input: "2*3=4", output: "2 3 * 4 ="},
            {input: "2*3=4+5", output: "2 3 * 4 5 + ="},
        ]
        testAll(tests);
    })
})