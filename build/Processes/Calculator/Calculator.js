"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Process_1 = require("../Process");
const Expression_1 = require("../../Expression/Expression");
const Stack_1 = __importDefault(require("../../Utils/Stack"));
const Token_1 = require("../Parser/tokens/Token");
const ExpressionBuilder_1 = require("../../Expression/ExpressionBuilder");
class Calculator extends Process_1.Traceable {
    run(input) {
        if (Expression_1.isExpression(input) && input.errors === undefined) {
            return this.compute(input);
        }
        //console.log((<IExpression>input).errors);
        return input;
    }
    compute(input) {
        if (input.details.isFunction)
            return input;
        const stack = new Stack_1.default();
        for (let current of input.tokens) {
            if (current.type === Token_1.TokenTypes.Number) {
                const value = current.value;
                if (typeof value === "number") {
                    stack.push(value);
                }
            }
            else if (Token_1.isFunctionalToken(current)) {
                const operation = current.value;
                const argLength = current.argLength;
                if (typeof operation !== "function") {
                    throw new Error("Expect that value of functional token will be function");
                }
                const args = new Stack_1.default();
                for (let i = 0; i < argLength; i++) {
                    args.push(stack.pop());
                }
                const value = operation(args);
                //console.log(current.id, value)
                if (isNaN(value)) {
                    const error = new RangeError("Value of operation out of domain");
                    ExpressionBuilder_1.ExpressionBuilder.pushError(input, error);
                    throw error;
                }
                stack.push(value);
            }
        }
        const value = stack.pop();
        input.value = value !== undefined ? value : null;
        return input;
    }
}
exports.default = Calculator;
