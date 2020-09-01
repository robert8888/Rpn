"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class Variable {
    constructor() {
        this.value = null;
    }
    get id() {
        return "Variable";
    }
    ;
    get type() {
        return Token_1.TokenTypes.Variable;
    }
    ;
    get name() {
        return this._name || "";
    }
    test(input) {
        var _a;
        const pattern = /^(?<name>[a-z])(?=[^a-z]|$)/;
        const match = pattern.exec(input);
        if (!match)
            return 0;
        this._name = (_a = match.groups) === null || _a === void 0 ? void 0 : _a.name;
        return match[0].length;
    }
}
exports.default = Variable;
