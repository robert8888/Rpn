import Rpn from "../src/lib";
import WolframFetcher from "./utiils/WolframFetcher";

const testAll = async (tests: string[]) => {
    const rpn = new Rpn();
    const wolfram = new WolframFetcher();

    await Promise.all(tests.map(test => wolfram.getResultFor(test))).then( wolframResults => {
        wolframResults.forEach((wolframResult: string, index) => {
            const wolframValue = parseFloat(wolframResult);
            const value = <number>rpn.valueOf(tests[index]);
            expect(Math.abs(Math.abs(value) - Math.abs(wolframValue))).toBeLessThan(.1);
        })
    });
}

describe("calculator result compare to wolfram", () => {
    test("basic math", ()=>{
        const tests = [
           "1 + 3",
           "sin(30deg)",
           "pow(5,2)",
            "|-4*2|+5",
        ];
        return testAll(tests);
    });

    test("long expressions", ()=>{
        const tests = [
            "1*2/5+7 - 5*5/6*8 - 5+4 - 8*6*7/8/5 - 2*3",
            "cos(45/pi*180)*(sin(pi)*cos(pi)- 456.54*tan(-456.87)*pi*e)",
            "4+5- 5 *-45 - 45+(45*2) * cos(sin(tg(ctg(30deg))))*3",
            "|cos(30deg)+45*5| +5! + pow(3, 4) + sqrt(16) + 123"
        ];
        return testAll(tests);
    });
})