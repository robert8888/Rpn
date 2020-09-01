import Parser from "../src/lib/Processes/Parser/Parser";
import {IExpression} from "../src/lib/Expression/Expression";
import {IFunctionalToken, TokenTypes} from "../src/lib/Processes/Parser/tokens/Token";
import Coma from "../src/lib/Processes/Parser/tokens/special/Coma";
import Bracket, {BracketVariant} from "../src/lib/Processes/Parser/tokens/special/Bracket";
import {default as NumberToken} from "../src/lib/Processes/Parser/tokens/special/Number";

type ErrorTest = {
    input: string,
    error?: {id: string,  position: number }
    errors?: {id: string,  position: number }[]
}

function testIdAndPosition(tests: ErrorTest[], print?:boolean){
    for(let test of tests){
       const parser = new Parser();
       const expression = <IExpression>parser.run(test.input);
       print && console.log(expression.toString());
       if(!test.error && !test.errors){
           expect(expression).not.toHaveProperty("errors");

       } else {
           expect(expression).toHaveProperty("errors");
           const errors = (test.error ? [test.error] : test.errors);
           print && console.log(expression.errors);
           for(let error of errors){
               expect(
                   expression.errors.find( _error =>
                       _error.id === error.id && _error.position === error.position
                   )
               ).not.toBeUndefined()
           }
       }
    }
}

describe("Expression validator ", () => {
    test("Coma position", () => {
        const tests = [
            {input: "(),()", error: {id: "ComaPosition", position: 2}},
            {input: "(,)()", error: {id: "ComaPosition", position: 1}},
            {input: "pow(,),()", error: {id: "ComaPosition", position: 6}},
            {input: "()(),", error: {id: "ComaPosition", position: 4}},
            {input: "pow(,)(4)"},
        ]
        testIdAndPosition(tests)
    })

    test("Bracket mismatch", () => {
        const tests = [
            {input: "()())", error: {id: "BracketMismatch", position: 4}},
            {input: "()[())", errors: [
                    {id: "BracketMismatch", position: 2},
                    {id: "BracketMismatch", position: 5}
                ]
            },
            {input: "(((1+1)*2)*3)"},
        ]
        testIdAndPosition(tests)
    })

    test("Empty bracket pattern", () => {
        const tests = [
            {input: "()()", errors: [
                    {id: "EmptyBracket", position: 0},
                    {id: "EmptyBracket", position: 2},
                ]
            },
            {input: "sin(cos[])+sin()", errors: [
                    {id: "EmptyBracket", position: 7},
                     {id: "EmptyBracket", position: 14},
                ]
            },
            {input: "cos[[[]]]", errors: [
                    {id: "EmptyBracket", position: 5},
                ]
            }
        ]
        testIdAndPosition(tests)
    })

    test("Is function has brackets", () => {
        const tests = [
            {input: "sin+()*cos()+ctg", errors: [
                    {id: "FunctionBracketMiss", position: 0},
                    {id: "FunctionBracketMiss", position: 13},
                ]
            },
            {input: "5!+sin(1)+cos+45", errors: [
                    {id: "FunctionBracketMiss", position: 10},
                ]
            },
        ]
        testIdAndPosition(tests)
    })



    test("Comparisons limit", () => {
        const tests = ["1 > 2 = 3", "sin(2)+4 = 45 - 45 < 45 + 454", ">=<", "<= + 45 <= 5", "1=2=3"];
        const parser = new Parser();
        for(let test of tests){
            let expression = <IExpression>parser.run(test);
            expect(expression).toHaveProperty("errors");
        }
    })


    test("Have function enough arguments", () => {
        const parser = new Parser();
        parser.Tokenizer.tokens = [
            <IFunctionalToken>{
                id: "TestToken",
                argLength: 3,
                priority: 4,
                test: ["test"],
                type: TokenTypes.Function
            },
            new Coma(),
            new Bracket("Round", BracketVariant.Open, "("),
            new Bracket("Round", BracketVariant.Close, ")"),
            new NumberToken()
        ]

        let expression = <IExpression>parser.run("test(1,2,3)");
        expect(expression).not.toHaveProperty("errors");

        expression = <IExpression>parser.run("test(a,b)");
        expect(expression).toHaveProperty("errors");
        expect(expression.errors.find(error => error.id === "FunctionArguments" && error.position  === 0 ))

    })

    test("Have function enough arguments", () => {
        const tests = [
            {input: "pow(1)+sin(1)+root(1)", errors: [
                    {id: "FunctionArguments", position: 0},
                    {id: "FunctionArguments", position: 14},
                ]
            },
            {input: "pow(1,pow(5))+root(root(pow(1),1),1)", errors: [
                    {id: "FunctionArguments", position: 6},
                    {id: "FunctionArguments", position: 24},
                ]
            },
            {input: "(root(64,8)+pow(5,2))"},
            {input: "|5|"},
            {input: "||", errors: [
                    {id: "FunctionArguments", position: 3},
                ]
            },

        ]
        testIdAndPosition(tests)
    })

});


