"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Process_1 = require("../../../../Process/Process");
const Bracket_1 = require("../../tokens/special/Bracket");
const Token_1 = require("../../tokens/Token");
const ExpressionBuilder_1 = require("../../../../Expression/ExpressionBuilder");
const Validator_1 = require("../Validator");
class BracketMismatch extends Process_1.Traceable {
    run(input) {
        const output = BracketMismatch.check(input);
        if (!output) {
            return input;
        }
        return output;
    }
    static check(input) {
        var _a, _b;
        const stacks = new Map();
        for (let token of input.tokens) {
            if (token.type !== Token_1.TokenTypes.Bracket)
                continue;
            const bracket = token;
            if (bracket.variant === Bracket_1.BracketVariant.Open) {
                let current = stacks.get(bracket.subtype) || new Array();
                current.push(bracket);
                stacks.set(bracket.subtype, current);
            }
            else {
                let current = stacks.get(bracket.subtype) || new Array();
                if (!current.length) {
                    //error - not opened
                    const _position = ((_a = bracket.position) === null || _a === void 0 ? void 0 : _a.original) || 0;
                    ExpressionBuilder_1.ExpressionBuilder.pushError(input, new Validator_1.ValidationError("BracketMismatch", `Incorrect sequence of brackets. Each closing
                         bracket has to be preceded by opening. At position ${_position}`, _position));
                }
                current.pop();
                stacks.set(bracket.subtype, current);
            }
        }
        for (let [, stack] of stacks.entries()) {
            if (stack.length) {
                //error - not closed
                const bracket = stack.pop();
                if (!bracket)
                    return;
                const _position = ((_b = bracket.position) === null || _b === void 0 ? void 0 : _b.original) || 0;
                ExpressionBuilder_1.ExpressionBuilder.pushError(input, new Validator_1.ValidationError("BracketMismatch", `Incorrect sequence of brackets. Bracket on position ${_position + 1} must be closed`, _position));
            }
        }
        return input;
    }
}
exports.default = BracketMismatch;
