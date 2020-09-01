"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Process_1 = require("../../../../Process/Process");
const Token_1 = require("../../tokens/Token");
const Bracket_1 = require("../../tokens/special/Bracket");
const ExpressionBuilder_1 = require("../../../../Expression/ExpressionBuilder");
const Validator_1 = require("../Validator");
const Stack_1 = __importDefault(require("../../../../Utils/Stack"));
class FunctionArguments extends Process_1.Traceable {
    run(input) {
        input = input;
        return FunctionArguments.check(input);
    }
    static check(input) {
        let tokens = input.tokens;
        function pushError(i, argLength) {
            var _a;
            const origin = tokens[i].origin;
            const position = ((_a = tokens[i].position) === null || _a === void 0 ? void 0 : _a.original) || 0;
            ExpressionBuilder_1.ExpressionBuilder.pushError(input, new Validator_1.ValidationError("FunctionArguments", `Function ${origin} expect to have ${argLength} arguments`, position));
        }
        for (let i = 0; i < tokens.length; i++) {
            const current = tokens[i];
            if (current.type !== Token_1.TokenTypes.Function) {
                continue;
            }
            if (current.argLength === 1) {
                const stack = new Stack_1.default();
                for (let k = i + 1; k < tokens.length; k++) {
                    let current = tokens[k];
                    if (current.type === Token_1.TokenTypes.Bracket) {
                        if (current.variant === Bracket_1.BracketVariant.Open) {
                            stack.push(current);
                        }
                        else {
                            while (!stack.isEmpty && stack.top.type === Token_1.TokenTypes.Bracket) {
                                stack.pop();
                            }
                            if (stack.isEmpty) {
                                pushError(i, 1);
                            }
                            break;
                        }
                    }
                    else {
                        stack.push(current);
                    }
                }
            }
            else { // two an more arguments
                const argLength = current.argLength;
                const stack = new Stack_1.default();
                let args = 1;
                for (let k = i; k < tokens.length; k++) {
                    const current = tokens[k];
                    if (current.type === Token_1.TokenTypes.Separator) {
                        stack.push(current);
                    }
                    else if (current.type === Token_1.TokenTypes.Bracket) {
                        if (current.variant === Bracket_1.BracketVariant.Open) {
                            stack.push(current);
                        }
                        else {
                            while (!stack.isEmpty && stack.top.type === Token_1.TokenTypes.Separator) {
                                stack.pop();
                                args++;
                            }
                            stack.pop();
                            if (!stack.length) {
                                if (args !== argLength) {
                                    pushError(i, argLength);
                                }
                                break;
                            }
                        }
                    }
                }
            }
        }
        return input;
    }
}
exports.default = FunctionArguments;
