"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Process_1 = require("../../../../Process/Process");
const Token_1 = require("../../tokens/Token");
const Bracket_1 = require("../../tokens/special/Bracket");
const ExpressionBuilder_1 = require("../../../../Expression/ExpressionBuilder");
const Validator_1 = require("../Validator");
class ComaPosition extends Process_1.Traceable {
    run(input) {
        return this.check(input);
    }
    check(input) {
        input.tokens.forEach((token, index) => {
            if (token.type !== Token_1.TokenTypes.Separator)
                return;
            const bracketStack = new Array();
            const comaStack = new Array();
            for (let i = index - 1; i >= 0; i--) {
                if (i === 0) {
                    ComaPosition.error(input, token.position);
                }
                let current = input.tokens[i];
                if (current.type === Token_1.TokenTypes.Separator) {
                    comaStack.push(current);
                    continue;
                }
                if (current.type !== Token_1.TokenTypes.Bracket)
                    continue;
                if (current.variant === Bracket_1.BracketVariant.Close) {
                    bracketStack.push(current);
                }
                else {
                    if (bracketStack.length) {
                        bracketStack.pop();
                    }
                    else {
                        const prev = input.tokens[i - 1];
                        if (prev && prev.type === Token_1.TokenTypes.Function && prev.argLength >= 2) {
                            comaStack.pop();
                            if (!comaStack.length) {
                                break;
                            }
                        }
                        else {
                            ComaPosition.error(input, token.position);
                        }
                    }
                }
            }
        });
        return input;
    }
    static error(expression, position) {
        const _position = (position === null || position === void 0 ? void 0 : position.original) || 0;
        ExpressionBuilder_1.ExpressionBuilder.pushError(expression, new Validator_1.ValidationError("ComaPosition", `Not correct separator position: ${_position + 1} (Coma). It should be placed in function with two arguments`, _position));
    }
}
exports.default = ComaPosition;
