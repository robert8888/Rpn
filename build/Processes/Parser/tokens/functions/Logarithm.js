"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class Logarithm {
    constructor() {
        this.test = ["log"];
        this.priority = 3;
        this.value = (args) => {
            if (args.length !== 2) {
                throw new RangeError(this.id + " operation expect two arguments");
            }
            const arg = args[0];
            const base = args[1];
            if (arg < 0) {
                throw new RangeError(this.id + " attempt to calculate logarithm from negative argument");
            }
            if (base <= 0) {
                throw new RangeError(this.id + " logarithm base have to be positive number");
            }
            return Math.log(arg) / Math.log(base);
        };
    }
    get id() {
        return "Logarithm";
    }
    ;
    get type() {
        return Token_1.TokenTypes.Function;
    }
    ;
    get argLength() {
        return 2;
    }
}
exports.default = Logarithm;
