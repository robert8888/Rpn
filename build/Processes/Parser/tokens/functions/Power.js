"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class Power {
    constructor() {
        this.test = ["pow"];
        this.priority = 3;
        this.value = (args) => {
            if (args.length !== 2) {
                throw new RangeError(this.id + " operation expect exactly one arguments");
            }
            return Math.pow(args[1], args[0]);
        };
    }
    get id() {
        return "Power";
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
exports.default = Power;
