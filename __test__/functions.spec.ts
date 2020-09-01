import Rpn from "../src/lib";
import {ArgsInput} from "../src/lib/Processes/FunctionCalculator/FunctionCalculator";

type ArgsRange = {
    variables: [{name: string, from: number, to: number}];
    resolution: number
}

type ArgsArray = {[key:string]: number}[]



type Test = {
    input: string,
    args: ArgsInput
    values: number[]
}

const testAll = (tests: Test[]) =>{
    const rpn = new Rpn();
    for(let test of tests){
        const value = rpn.valueOf(test.input);
        // console.log("computed", value);
     //    console.log("rpn",  rpn.last.toString())
        expect(value).toBeNull();
        expect(rpn.last.details.isFunction).toBeTruthy();
        let argsLength = (<ArgsRange>test.args).variables?.length || Object.values(test.args[0]).length;
        expect(rpn.last.details.funcVarNames.length).toEqual(argsLength);
        const results = rpn.valuesOf(test.args);
      //  console.log(results)
        expect(
            results.every((result:number, index) => Math.abs(result - test.values[index]) < 0.1)
        ).toBeTruthy();
    }
}

describe("Functions computes", ()=>{
    test("One variable function", ()=>{
        const tests = [
            {
                input: "x+1",
                args: [{x:1}, {x:2}, {x:3}],
                values: [2, 3, 4],
            },
            {
                input: "cos(x)^+sin(x)^",
                args: Array(10).fill(1).map(item => ({x: Math.random()})),
                values: Array(10).fill(1),
            },
            {
                input: "|x-5| > 0",
                args: [{x:0}, {x:3}, {x:6}],
                values: [false, true, true],
            },
            {
                input: "2*x",
                args: [{x:0}, {x:3}, {x:6}],
                values: [0, 6, 12],
            },
            {
                input: "2x",
                args: {variables: [{name: "x", from: 0, to: 4}], resolution: 5},
                values: [0, 2, 4, 6, 8],
            },
            {
                input: "x",
                args: {variables: [{name: "x", from: -2, to: 4}], resolution: 7},
                values: [-2, -1, 0, 1, 2, 3, 4],
            },
            {
                input: "|2x| - 5 > 0",
                args: {variables: [{name: "x", from: -2, to: 4}], resolution: 7},
                values: [false, false, false, false, false, true, true],
            },
            {
                input: "x",
                args: {variables: [{name: "x", from: 1, to: 5}], resolution: 5},
                values: [1, 2, 3, 4, 5],
            },
            {
                input: "(x! - x! + sin(x)^ + cos(x)^) * x! ",
                args: {variables: [{name: "x", from: 1, to: 5}], resolution: 5},
                values: [1, 2, 6, 24, 120],
            },
        ]
        //@ts-ignore
        testAll(tests);
    })

    test("Multi variables function", ()=>{
        const tests = [
            {
                input: "x + y + z",
                args: [{x:1, y:1, z:1}, {x:2, y:2, z:2}, {x:3, y:3, z:3}],
                values: [3, 6, 9],
            },
            {
                input: "sin(x)sin(y) + cos(x)cos(y)",
                args: [{x:1, y:1}, {x:2, y:2}, {x:6, y:6}],
                values: Array(3).fill(1),
            },
            {
                input: "(sin(x)sin(y) + cos(x)cos(y))(sin(y)sin(x) + cos(y)cos(x))tg(45deg)/ctg(45deg)/(sin(30deg)^+cos(30deg)^)",
                args: [{x:1, y:1}, {x:2, y:2}, {x:6, y:6}],
                values: Array(3).fill(1),
            },
            {
                input: "(x+y+z)/(3x+3)",
                args: [{x:1, y:2, z:3}, {x:2, y:3, z:4}, {x:3, y:4, z:5}],
                values: [1, 1, 1],
            },
            {
                input: "sin(x)sin(y)+cos(x)cos(y)",
                args: {variables: [{name: "x", from: 1, to: 5}, {name: "y", from: 1, to: 5}], resolution: 5},
                values: [1,1 ,1 ,1 ,1],
            },
        ]
        //@ts-ignore
        testAll(tests);
    })
})