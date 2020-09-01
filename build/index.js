"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Processor_1 = __importDefault(require("./Processor/Processor"));
const Parser_1 = __importDefault(require("./Processes/Parser/Parser"));
const Converter_1 = __importDefault(require("./Processes/Converter/Converter"));
const Calculator_1 = __importDefault(require("./Processes/Calculator/Calculator"));
var Processor_2 = require("./Processor/Processor");
Object.defineProperty(exports, "Processor", { enumerable: true, get: function () { return Processor_2.default; } });
class Rpn extends Processor_1.default {
    constructor() {
        super();
        this.computes = new Map();
        this.use(new Parser_1.default());
        this.use(new Converter_1.default());
        this.use(new Calculator_1.default());
    }
    expression(input) {
        if (!this.computes.has(input)) {
            this.computes.set(input, this.compute(input));
        }
        return this.computes.get(input);
    }
    valueOf(input) {
        return this.expression(input).value;
    }
    expresionFrom(input) {
        return this.expression(input);
    }
}
exports.default = Rpn;
(() => {
    function testOrder(tests, print) {
        const parser = new Parser_1.default();
        for (let test of tests) {
            const expression = parser.run(test.input);
            print && console.log(expression.tokens);
        }
    }
    const tests = [
        { input: "|x|", ids: ["Absolute", "Bracket", "Variable", "Bracket"] },
        { input: "45+|x|", ids: ["Number", "Summation", "Absolute", "Bracket", "Variable", "Bracket"] },
    ];
    testOrder(tests);
})();
