"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class Constant {
    constructor(id, value, pattern) {
        this.id = id;
        this.value = value;
        if (!(pattern instanceof Array)) {
            pattern = new Array(pattern);
        }
        this.test = pattern;
    }
    get type() {
        return Token_1.TokenTypes.Number;
    }
    ;
}
exports.default = Constant;
