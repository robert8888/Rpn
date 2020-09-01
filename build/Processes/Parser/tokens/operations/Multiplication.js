"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class Multiplication {
    constructor() {
        this.test = ["*"];
        this.priority = 2;
        this.value = (args) => {
            if (args.length !== 2) {
                throw new RangeError(this.id + " operation expect two arguments");
            }
            return args[0] * args[1];
        };
    }
    get id() {
        return "Multiplication";
    }
    ;
    get type() {
        return Token_1.TokenTypes.Operation;
    }
    ;
    get argLength() {
        return 2;
    }
}
exports.default = Multiplication;
