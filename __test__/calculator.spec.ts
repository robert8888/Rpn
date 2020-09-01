import Rpn from "../src/lib";
import {IExpression} from "../src/lib/Expression/Expression";

type test = {input: string, value: number|boolean}

const testAll = (tests: test[]) => {
    const rpn = new Rpn();
    for(let test of tests){
        const value = rpn.valueOf(test.input);
        // console.log(rpn.partial[rpn.partial.length - 3].toString())
        // console.log(rpn.partial[rpn.partial.length - 2].toString())
        // console.log(value);
        expect(Math.abs(<number>value ) - Math.abs(<number>test.value)).toBeLessThan(0.001)
    }
}

const testAllComparisons = (tests: test[]) => {
    const rpn = new Rpn();
    for(let test of tests){
        const value = rpn.valueOf(test.input);
        // console.log(rpn.partial[rpn.partial.length - 3].toString())
        //  console.log(rpn.partial[rpn.partial.length - 2].toString())
        // console.log((<IExpression>rpn.partial[rpn.partial.length - 1]).errors)
        expect(<boolean>value).toEqual(<boolean>test.value)
    }
}

describe("calculator test", () => {
    test("basic math", ()=>{
        const tests = [
            {input: "1+2", value: 3},
            {input: "1+2+3", value: 6},
            {input: "1+2*3", value: 7},
            {input: "(4*6/8)+(4+5)*2", value: 21},
            {input: "cos(60deg)", value: 0.5},
            {input: "sin(30deg)", value: 0.5},
            {input: "tan(45deg)", value: 1},
            {input: "ctg(45deg)", value: 1},
            {input: "pow(2,2)", value: 4},
            {input: "pow(2,3)", value: 8},
            {input: "pow(2,5)", value: 32},
            {input: "root(9,2)", value: 3},
            {input: "3!", value: 6},
            {input: "3^", value: 9},
            {input: "abs(-3)+abs(-5)",  value: 8},
            {input: "ln(3)", value: Math.log(3)},
            {input: "sqrt(64)", value: 8},
            {input: "tg(45deg) / ctg(45deg)", value: 1},
            {input: "(tg(45deg) / ctg(45deg))", value: 1}
        ]

        testAll(tests);
    })



    test("Comparisons", ()=>{
        const tests = [
            {input: "0.1=0.1", value: true},
            {input: "0.1=0.01", value: false},
            {input: "0.00001=0.000001", value: false},
            {input: "0.000001=0.0000001", value: true}, // equality works to 6 digits after coma
            {input: "1=2", value: false},
            {input: "3^=sqrt(9)^", value: true},
            {input: "(2+5) > (1+2)*2", value: true},
            {input: "(2+5) < (1+2)*2", value: false},
            {input: "1>=1", value: true},
            {input: "1<=1", value: true},
            {input: "1<=0", value: false},
            {input: "cos(15deg)^ + sin(15deg)^ = tan(45deg) / ctg(45deg)", value: true},
            {input: "sin(pi) = 0", value: true},
            {input: "1=2=4", value: null},
            {input: "1=2>4", value: null},
        ]

        testAllComparisons(tests);
    })

    test("Big expression", () =>{
        let tests = [
            {input: "+5- 45*sqrt(9)", value: -130.00},
            {input: "25.54(sin(5/pi*180)+cos(34/pi*180)*pi*e)/546", value:  0.36},
            {input: "ln(sqrt(log(3, pi)*5*sin(e)+tan(pi)))", value:  0.38},
            {input: "log(3,4+log(3,57))*(cos(45/pi*180))", value:  -1.10},
            {input: "-log(3,45.87)*sqrt(-14.54*-1)+456", value:  442.72112},
            {input: "cos(45/pi*180)*(sin(pi)*cos(pi)-456.54*tan(-456.87)*pi*e)", value:  -9778.01},
            {input: "cos(45/pi*180)*(sin(180)*cos(180)", value: -0.28374},
            {input: "(456.54*tan(-456.87/pi*180)*pi*e) +e/100", value: -5723.265},
            {input: "(cos(45/pi*180)*(sin(180)*cos(180) - 456.54*tan(-456.87/pi*180)*pi*e)+e/100", value: -3387.37},
            {input: "root(cos(45/pi*180)*(sin(180)*cos(180)- 456.54*tan(-456.87/pi*180)*pi*e)+e/100,  7)", value:  0.999425}
        ];
        testAll(tests);
    })

})