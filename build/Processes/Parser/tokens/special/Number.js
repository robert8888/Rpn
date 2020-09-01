"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class Number {
    constructor(value) {
        this.value = 0;
        this.test = (input) => {
            const pattern = /^[-]?(?:(?:[0-9]+\.?[0-9]*)|(?:\.[0-9]+))/;
            const match = pattern.exec(input);
            if (!match)
                return 0;
            this.value = parseFloat(match[0]);
            return match[0].length;
        };
        this.value = value || 0;
    }
    get id() {
        return "Number";
    }
    ;
    get type() {
        return Token_1.TokenTypes.Number;
    }
    ;
}
exports.default = Number;
