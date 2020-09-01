"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class Space {
    constructor() {
        this.test = [/^\s+/];
    }
    get id() {
        return "Spacer";
    }
    ;
    get type() {
        return Token_1.TokenTypes.Spacer;
    }
    ;
}
exports.default = Space;
