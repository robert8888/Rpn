import Parser from "../src/lib/Processes/Parser/Parser";
import {IExpression} from "../src/lib/Expression/Expression";


function testOrder(tests: {input: string, ids: string[]}[], print?: boolean) {
    const parser = new Parser();
    for (let test of tests) {
        const expression = <IExpression>parser.run(test.input);
        print && console.log(expression.tokens);
        expect(
            expression.tokens.every((token, index) => token.id === test.ids[index])
        ).toEqual(true)
    }
}

function testLength(tests: {input: string, length: number}[], print?: boolean) {
    const parser = new Parser();
    for (let test of tests) {
        const expression = <IExpression>parser.run(test.input);
        print && console.log(expression.tokens.map(token => token.origin).reduce((acc, curr)=> acc + curr, ""));
        expect(expression.tokens.length).toEqual(test.length);
    }
}

function testTransformation(tests: {input: string, output: string}[]) {
    const parser = new Parser();
    for (let test of tests) {
        const expression = <IExpression>parser.run(test.input);
        expect(expression.tokens.map(token => token.origin).reduce((acc, curr)=> acc + curr, "")).toEqual(test.output);
    }
}

describe("Parser", () => {
    test("simple expression", () => {
        const parser = new Parser();
        const expression = <IExpression>parser.run("5+6");
        expect(expression.details.length).toEqual(3)
    })

    test("Upper case test ", () => {
        const parser = new Parser();
        const expression = <IExpression>parser.run("COS(1*DEG)+PI");
        expect(expression.details.length).toEqual(8)
    })


    test("Reduce duplicated operations", ()=>{
        const tests = [
            {input: "cos(1++56)", length: 6},
            {input: "1++++", length: 2},
            {input: "5+45!!+2", length: 6},
            {input: "7895+1+((+52))", length: 10},
            {input: "()++()!!", length: 6},
        ]
        testLength(tests);
    })

    test("Remove space signs", ()=>{
        const tests = [
            {input: "    ", length: 0},
            {input: "5++     ++", length: 2},
            {input: "5+45!!        +2", length: 6},
            {input: "7895 + 1-((+ 52))", length: 10},
            {input: "(  )++()!!", length: 6},
        ]
        testLength(tests);
    })

    test("Bracket by bracket multiplication", ()=>{
        const tests = [
            {input: "(1)(5)", ids: ["Bracket", "Number", "Bracket", "Multiplication","Bracket", "Number", "Bracket"]},
            {input: "5+[1](5)", ids: ["Number", "Summation", "Bracket", "Number", "Bracket", "Multiplication","Bracket", "Number", "Bracket"]}
        ]
        testOrder(tests);
    })

    test("Bracket by number multiplication", () =>{
        const tests = [
            {input: "(x)5", ids: ["Bracket", "Variable", "Bracket", "Multiplication", "Number"]},
            {input: "[x]5", ids: ["Bracket", "Variable", "Bracket", "Multiplication", "Number"]},
            {input: "()5()5", ids: ["Bracket", "Bracket", "Multiplication", "Number", "Multiplication", "Bracket", "Bracket", "Multiplication", "Number"]},
            {input: "()5+[]5", ids: ["Bracket", "Bracket", "Multiplication", "Number","Summation" , "Bracket", "Bracket", "Multiplication", "Number"]},
        ]
        testOrder(tests);
    })

    test("Number by bracket multiplication", () =>{
        const tests = [
            {input: "5(x)", ids: ["Number", "Multiplication", "Bracket", "Variable", "Bracket"]},
            {input: "45+5[x]", ids: ["Number", "Summation", "Number", "Multiplication", "Bracket", "Variable", "Bracket"]},
            {input: "[4]- 5([x])",
                ids: ["Bracket", "Number", "Bracket", "Subtraction", "Number" ,"Multiplication" ,
                      "Bracket", "Bracket", "Variable", "Bracket", "Bracket"]},
        ]
        testOrder(tests);
    })

    test("Number by variable and vice versa", () => {
        const tests = [
            {input: "5x", ids: ["Number", "Multiplication",  "Variable"]},
            {input: "x5", ids: ["Variable", "Multiplication", "Number"]},
        ]
        testOrder(tests);
    })

    test("Function by number", () => {
        const tests = [
            {input: "5cos(x)", ids: ["Number", "Multiplication",  "Cosine", "Bracket", "Variable", "Bracket"]},
            {input: "5+2sin(1)", ids: ["Number", "Summation", "Number", "Multiplication", "Sine", "Bracket", "Number", "Bracket"]},
        ]
        testOrder(tests);
    })

    test("Number and variable by constant", () => {
        const tests = [
            {input: "pix", ids: ["Constant_Pi", "Multiplication", "Variable"]},
            {input: "x e", ids: ["Variable", "Multiplication", "Constant_E"]}
        ]
        testOrder(tests);
    })

    test("Negation replace on multiplication", ()=>{
        const tests = [
            {input: "1+(-cos())", output: "1+(-1*cos())"},
            {input: "1+(-cos())1+(-cos())1+(-cos())", output: "1+(-1*cos())*1+(-1*cos())*1+(-1*cos())"},
            {input: "5+2*-cos()", output: "5+2*-1*cos()"},
            {input: "+5*45/-1", output: "5*45/-1"},
            {input: "*5*45/-cos()", output: "5*45/-1*cos()"},
            {input: "-87cos(-sin(1))", output: "-87*cos(-1*sin(1))"},
        ]
        testTransformation(tests);
    })

    test("Absolute operation transform", () => {
        const tests = [
            {input: "|x|", ids: ["Absolute", "Bracket", "Variable", "Bracket"]},
            {input: "45+|x|", ids: ["Number", "Summation", "Absolute", "Bracket", "Variable", "Bracket"]},
        ]
        testOrder(tests);
    })
})