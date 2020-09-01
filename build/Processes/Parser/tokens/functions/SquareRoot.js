"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class SquareRoot {
    constructor() {
        this.test = ["sqrt"];
        this.priority = 3;
        this.value = (args) => {
            if (args.length !== 1) {
                throw new RangeError(this.id + " operation expect exactly one argument");
            }
            return Math.sqrt(args[0]);
        };
    }
    get id() {
        return "SquareRoot";
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
exports.default = SquareRoot;
