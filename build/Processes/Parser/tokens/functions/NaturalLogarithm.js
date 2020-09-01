"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class NaturalLogarithm {
    constructor() {
        this.test = ["ln"];
        this.priority = 3;
        this.value = (args) => {
            if (args.length !== 1) {
                throw new RangeError(this.id + " operation expect exactly one argument");
            }
            const arg = args[0];
            if (arg < 0) {
                throw new RangeError(this.id + " attempt to calculate logarithm from negative argument");
            }
            return Math.log(arg);
        };
    }
    get id() {
        return "NaturalLogarithm";
    }
    ;
    get type() {
        return Token_1.TokenTypes.Function;
    }
    ;
    get argLength() {
        return 1;
    }
}
exports.default = NaturalLogarithm;
