"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Calculator_1 = __importDefault(require("../Calculator/Calculator"));
const Substitutor_1 = __importDefault(require("./Substitutor/Substitutor"));
const Processor_1 = __importDefault(require("../../Processor/Processor"));
class FunctionCalculator extends Processor_1.default {
    constructor() {
        super();
        this.use(new Substitutor_1.default());
        this.use(new Calculator_1.default());
    }
    computeArgs(range) {
        const args = new Array();
        for (let i = 0; i < range.resolution; i++) {
            let values = {};
            for (let variable of range.variables) {
                values[variable.name] = variable.from + ((variable.to - variable.from) / (range.resolution - 1)) * i;
            }
            args.push(values);
        }
        return args;
    }
    valuesOf(input, args) {
        const results = new Array();
        if (!(args instanceof Array)) {
            args = this.computeArgs(args);
        }
        for (let values of args) {
            this.Substitutor.values = values;
            const expression = this.compute(input);
            results.push(expression.value);
        }
        //clearing
        this.Substitutor.clear();
        this.compute(input);
        return results;
    }
}
exports.default = FunctionCalculator;
