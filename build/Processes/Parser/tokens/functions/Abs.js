"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAbsoluteDelimiter = void 0;
const Token_1 = require("../Token");
function isAbsoluteDelimiter(token) {
    return token.id === "Absolute" && token.isDelimiter;
}
exports.isAbsoluteDelimiter = isAbsoluteDelimiter;
class Absolute {
    constructor() {
        this._isDelimiter = false;
        this.test = (input) => {
            if (input.startsWith("abs")) {
                return 3;
            }
            else if (input.startsWith("|")) {
                this._isDelimiter = true;
                return 1;
            }
            return 0;
        };
        this.priority = 3;
        this.value = (args) => {
            if (args.length !== 1) {
                throw new RangeError(this.id + " operation expect exactly one arguments");
            }
            return Math.abs(args[0]);
        };
    }
    get isDelimiter() { return this._isDelimiter; }
    get id() {
        return "Absolute";
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
exports.default = Absolute;
