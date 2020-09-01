"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class Subtraction {
    constructor() {
        this.test = ["-"];
        this.priority = 1;
        this.value = (args) => {
            if (args.length !== 2) {
                throw new RangeError(this.id + " operation expect two arguments");
            }
            return args[1] - args[0];
        };
    }
    get id() {
        return "Subtraction";
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
exports.default = Subtraction;
