"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class Square {
    constructor() {
        this.test = ["^"];
        this.priority = 3;
        this.value = (args) => {
            if (args.length !== 1) {
                throw new RangeError(this.id + " operation expected exactly one argument");
            }
            return Math.pow(args[0], 2);
        };
    }
    get id() {
        return "Square";
    }
    ;
    get type() {
        return Token_1.TokenTypes.Operation;
    }
    ;
    get argLength() {
        return 1;
    }
}
exports.default = Square;
