"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class Cosine {
    constructor() {
        this.test = ["cos"];
        this.priority = 3;
        this.value = (args) => {
            if (args.length !== 1) {
                throw new RangeError(this.id + " operation expect exactly one arguments");
            }
            return Math.cos(args[0]);
        };
    }
    get id() {
        return "Cosine";
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
exports.default = Cosine;
