"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class Equality {
    constructor() {
        this.test = ["="];
        this.priority = 0;
        this.value = (args) => {
            if (args.length !== 2) {
                throw new RangeError("Comparison operation expect two arguments");
            }
            return Math.abs(args[0] - args[1]) < Math.pow(.1, 6);
        };
    }
    get id() {
        return "Equality";
    }
    ;
    get type() {
        return Token_1.TokenTypes.Comparison;
    }
    ;
    get argLength() {
        return 2;
    }
}
exports.default = Equality;
