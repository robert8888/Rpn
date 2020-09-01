import Tokenizer from "../src/lib/Processes/Parser/Tokenizer";
import {Token, TokenTypes} from "../src/lib/Processes/Parser/tokens/Token";
import {IExpression} from "../src/lib/Expression/Expression";

function testTokensIds(tests: {input: string, ids: Array<string>}[], print?: boolean) {
    const tokenizer = new Tokenizer();
    for (let test of tests) {
        const expression = <IExpression>tokenizer.run(test.input);
        print && console.log(expression.toString())
        expression.tokens.forEach((token, index) => {
            expect(token.id).toEqual(test.ids[index])
        })
    }
}

describe("Tokenizer token extend test", () => {
    test("Empty token array", () => {
        const tokenizer = new Tokenizer();
        tokenizer.tokens = Array<Token>();
        let expression = <IExpression>tokenizer.run("test")
        expect(expression.details.length).toEqual(0);

    })

    test("Only one Testing token", () => {
        const tokenizer = new Tokenizer();
        tokenizer.tokens = Array<Token>(<Token>{
            id:"TestToken",
            test : ["test"],
            type: TokenTypes.Function
        })
        let expression = <IExpression>tokenizer.run("testtest")
        expect(expression.details.length).toEqual(2);
    })


    test("All tokens single one by one", ()=>{
        const constants = [
            {input: "e", ids: ['Constant_E']},
            {input: "pi", ids: ['Constant_Pi']},
            {input: "deg", ids: ['Constant_Deg']},
        ];

        const special = [
            {input: "12.5", ids: ['Number']},
            {input: "-12", ids: ['Number']},
            {input: "-.5", ids: ['Number']},
            {input: "x", ids: ['Variable']},
            {input: " ", ids: ["Spacer"]},
            {input: "       ", ids: ["Spacer"]},
            {input: ",", ids: ["Coma"]},
            {input: "()[]", ids: Array(4).fill("Bracket")},
        ];
        const operations = [
            {input: "/", ids: ['Division']},
            {input: "*", ids: ['Multiplication']},
            {input: "^", ids: ['Square']},
            {input: "!", ids: ['Factorial']},
            {input: "+", ids: ['Summation']},
            {input: "-", ids: ['Subtraction']},
        ]
        const functions = [
            {input: "sin", ids: ['Sine']},
            {input: "cos", ids: ['Cosine']},
            {input: "tg", ids: ['Tangent']},
            {input: "ctg", ids: ['Cotangent']},
            {input: "ln", ids: ['NaturalLogarithm']},
            {input: "log", ids: ['Logarithm']},
            {input: "sqrt", ids: ['SquareRoot']},
            {input: "pow", ids: ['Power']},
            {input: "root", ids: ['Root']},
        ]

        const comparisons = [
            {input: "=", ids: ['Equality']},
            {input: "<", ids: ['Less']},
            {input: ">", ids: ['Greater']},
            {input: ">=", ids: ["GreaterOrEqual"]},
            {input: "<=", ids: ["LessOrEqual"]}
        ]

        const tests = [
            ...constants,
            ...special,
            ...operations,
            ...functions,
            ...comparisons
        ]
        testTokensIds(tests);
    })

    test("Basic math operation + - * / and numbers", () => {
        const tokenizer = new Tokenizer();
        let expression = <IExpression>tokenizer.run("5+2/3*4")
        expect(expression.details.length).toEqual(7);
    })

    test("Composite expression", ()=>{
        const tests  = [
            {input: "45+45/2- 1.05",
             ids: ["Number", "Summation", "Number", "Division", "Number", "Subtraction", "Spacer", "Number"]},
            {input: "-(45*sin(5))",
             ids: ["Subtraction", "Bracket", "Number", "Multiplication", "Sine", "Bracket", "Number", "Bracket", "Bracket"]},
            {input: "-cos(45deg)",
             ids: ["Subtraction", "Cosine", "Bracket", "Number", "Constant_Deg", "Bracket"]},
            {input: "-.5pi/e",
            ids: ["Number", "Constant_Pi", "Division", "Constant_E"]},
        ]
        testTokensIds(tests)
    })

    test("Unreconciled sign", ()=>{
        const tokenizer = new Tokenizer();
        const tests = [
            {input: "sin(5)ss", errorPosition: 7},
            {input: "zzzsin(5)ss", errorPosition: 1},
            {input: "5 + 75z * 6 + ass + 5", errorPosition: 15},
        ]

        for(let test of tests){
            const expression = <IExpression>tokenizer.run(test.input)
            expect(expression).toHaveProperty("errors");
            expect(expression.errors[0].position).toEqual(test.errorPosition);
            expect(expression.errors[0].message.toLocaleLowerCase()).toContain("not recognized")
        }
    })

    test("Comparison signs", ()=>{
        const tokenizer = new Tokenizer();
        const tests = [
            { input: "1=2", order : ["Number", "Equality", "Number"]},
            { input: "1>2", order : ["Number", "Greater", "Number"]},
            { input: "1>=2", order : ["Number", "GreaterOrEqual", "Number"]},
            { input: "1<=2", order : ["Number", "LessOrEqual", "Number"]},
            { input: "1>2=3<1", order : ["Number", "Greater", "Number", "Equality", "Number", "Less", "Number"]},
        ]
        for(let test of tests){
            const expression = <IExpression>tokenizer.run(test.input);
            expect(expression.tokens.map(token => token.id)
                .every((tokenId, index) => tokenId === test.order[index])
            ).toEqual(true);
        }
    })

    test("Absolute delimiter", ()=>{
        const tests  = [
            {input: "|-4|+|-x|<|x|",
                ids: ["Absolute", "Number", "Absolute", "Summation", "Absolute", "Subtraction",  "Variable", "Absolute" , "Less", "Absolute", "Variable", "Absolute"]},
            {input: "||-x||",
                ids: ["Absolute",  "Absolute", "Subtraction", "Variable", "Absolute", "Absolute"]},
        ]
        testTokensIds(tests)
    })
});
