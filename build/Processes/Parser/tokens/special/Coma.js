"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class Coma {
    constructor() {
        this.test = [","];
    }
    get id() {
        return "Coma";
    }
    ;
    get type() {
        return Token_1.TokenTypes.Separator;
    }
    ;
}
exports.default = Coma;
