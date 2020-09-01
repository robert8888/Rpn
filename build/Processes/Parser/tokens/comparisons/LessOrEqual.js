"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class LessOrEqual {
    constructor() {
        this.test = ["<="];
        this.priority = 0;
        this.value = (args) => {
            if (args.length !== 2) {
                throw new RangeError("Comparison operation expect two arguments");
            }
            return args[1] <= args[0];
        };
    }
    get id() {
        return "LessOrEqual";
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
exports.default = LessOrEqual;
