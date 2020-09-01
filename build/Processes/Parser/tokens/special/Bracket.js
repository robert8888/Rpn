"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BracketVariant = void 0;
const Token_1 = require("../Token");
var BracketVariant;
(function (BracketVariant) {
    BracketVariant["Open"] = "Open";
    BracketVariant["Close"] = "Close";
})(BracketVariant = exports.BracketVariant || (exports.BracketVariant = {}));
class Bracket {
    constructor(subtype, variant, pattern) {
        this.subtype = subtype;
        this.variant = variant;
        if (!(pattern instanceof Array)) {
            pattern = new Array(pattern);
        }
        this.test = pattern;
    }
    get id() {
        return "Bracket";
    }
    ;
    get type() {
        return Token_1.TokenTypes.Bracket;
    }
    ;
}
exports.default = Bracket;
