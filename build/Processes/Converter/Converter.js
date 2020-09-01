"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Process_1 = require("../Process");
const ExpressionBuilder_1 = require("../../Expression/ExpressionBuilder");
const Token_1 = require("../Parser/tokens/Token");
const Expression_1 = require("../../Expression/Expression");
const Bracket_1 = require("../Parser/tokens/special/Bracket");
const Stack_1 = __importDefault(require("../../Utils/Stack"));
class Converter extends Process_1.Traceable {
    run(input) {
        if (Expression_1.isExpression(input) && !input.errors) {
            return this.convert(input);
        }
        return input;
    }
    convert(expression) {
        const rpn = new ExpressionBuilder_1.ExpressionBuilder();
        const stack = new Stack_1.default();
        for (let current of expression.tokens) {
            if (current.type === Token_1.TokenTypes.Variable || current.type === Token_1.TokenTypes.Number) {
                rpn.push(current);
            }
            else if (current.type === Token_1.TokenTypes.Bracket) {
                if (current.variant === Bracket_1.BracketVariant.Open) {
                    stack.push(current);
                }
                else {
                    while (!stack.isEmpty && stack.top.type !== Token_1.TokenTypes.Bracket) {
                        rpn.push(stack.pop());
                    }
                    stack.pop(); // opening bracket
                    if (!stack.isEmpty && stack.top.type === Token_1.TokenTypes.Function) {
                        rpn.push(stack.pop());
                    }
                }
            }
            else if (current.type === Token_1.TokenTypes.Separator) {
                while (!stack.isEmpty && stack.top.type !== Token_1.TokenTypes.Bracket) {
                    rpn.push(stack.pop());
                }
            }
            else if (Token_1.isFunctionalToken(current)) {
                if (!stack.isEmpty && Token_1.isFunctionalToken(stack.top)) {
                    while (!stack.isEmpty) {
                        const token = current;
                        const top = stack.top;
                        if (token.priority <= top.priority) {
                            rpn.push(stack.pop());
                        }
                        else {
                            break;
                        }
                    }
                }
                stack.push(current);
            }
        }
        while (!stack.isEmpty) {
            if (stack.top.type !== Token_1.TokenTypes.Bracket) {
                rpn.push(stack.pop());
            }
        }
        return rpn.build();
    }
}
exports.default = Converter;
