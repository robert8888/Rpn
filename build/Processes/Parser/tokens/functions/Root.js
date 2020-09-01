"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class Root {
    constructor() {
        this.test = ["root"];
        this.priority = 3;
        this.value = (args) => {
            if (args.length !== 2) {
                throw new RangeError(this.id + " operation expect two arguments");
            }
            return Math.pow(args[0], 1 / args[1]);
        };
    }
    get id() {
        return "Root";
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
exports.default = Root;
