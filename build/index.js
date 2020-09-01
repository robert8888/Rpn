"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Processor_1 = __importDefault(require("./Processor/Processor"));
const Parser_1 = __importDefault(require("./Processes/Parser/Parser"));
const Converter_1 = __importDefault(require("./Processes/Converter/Converter"));
const Calculator_1 = __importDefault(require("./Processes/Calculator/Calculator"));
const FunctionCalculator_1 = __importDefault(require("./Processes/FunctionCalculator/FunctionCalculator"));
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
        this.lastInput = input;
        if (!this.computes.has(input)) {
            this.computes.set(input, (this.compute(input)));
        }
        return (this.computes.get(input));
    }
    valueOf(input) {
        return this.expression(input).value;
    }
    valuesOf(args, input) {
        if (typeof input === "string") {
            input = this.expresion(input);
        }
        else if (input === undefined) {
            input = this.last;
        }
        if (!input) {
            throw new Error("Missing expression to calculated. Function valuesOf expect " +
                "second argument if previous calculation has not be executed");
        }
        if (!this.functionCalculator) {
            this.functionCalculator = new FunctionCalculator_1.default();
        }
        return this.functionCalculator.valuesOf(input, args);
    }
    expresionFrom(input) {
        return this.expression(input);
    }
    get last() {
        return this.computes.get(this.lastInput);
    }
    get lastValue() {
        return this.last.value;
    }
}
exports.default = Rpn;
