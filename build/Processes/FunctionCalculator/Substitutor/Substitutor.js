"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Process_1 = require("../../../Process/Process");
const Expression_1 = require("../../../Expression/Expression");
const Token_1 = require("../../Parser/tokens/Token");
class Substitutor extends Process_1.Traceable {
    constructor() {
        super(...arguments);
        this._values = {};
    }
    run(input) {
        if (Expression_1.isExpression(input)) {
            return this.substitute(input);
        }
        return input;
    }
    substitute(input) {
        for (let token of input.tokens) {
            if (token.type === Token_1.TokenTypes.Variable) {
                const current = token;
                current.value = this._values[current.name];
            }
        }
        return input;
    }
    set values(args) {
        this._values = args;
    }
    clear() {
        if (!this._values)
            return;
        for (let key in this._values) {
            this._values[key] = null;
        }
    }
}
exports.default = Substitutor;
