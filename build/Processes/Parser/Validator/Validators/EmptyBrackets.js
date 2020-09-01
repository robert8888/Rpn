"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Process_1 = require("../../../Process");
const Token_1 = require("../../tokens/Token");
const Bracket_1 = require("../../tokens/special/Bracket");
const ExpressionBuilder_1 = require("../../../../Expression/ExpressionBuilder");
const Validator_1 = require("../Validator");
class EmptyBrackets extends Process_1.Traceable {
    run(input) {
        input = input;
        return EmptyBrackets.check(input);
    }
    static check(input) {
        var _a;
        const tokens = input.tokens;
        for (let i = 0; i < tokens.length - 1; i++) {
            const current = tokens[i];
            const next = tokens[i + 1];
            const test = current.type === Token_1.TokenTypes.Bracket && current.variant === Bracket_1.BracketVariant.Open
                && next.type === Token_1.TokenTypes.Bracket && next.variant === Bracket_1.BracketVariant.Close;
            if (test) {
                const position = ((_a = current.position) === null || _a === void 0 ? void 0 : _a.original) || 0;
                ExpressionBuilder_1.ExpressionBuilder.pushError(input, new Validator_1.ValidationError("EmptyBracket", `Expression contains empty bracket pattern, at position: ${position}`, position));
            }
        }
        return input;
    }
}
exports.default = EmptyBrackets;
