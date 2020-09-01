"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Process_1 = require("../../../../Process/Process");
const Token_1 = require("../../tokens/Token");
const Multiplication_1 = __importDefault(require("../../tokens/operations/Multiplication"));
const ExpressionBuilder_1 = require("../../../../Expression/ExpressionBuilder");
const Number_1 = __importDefault(require("./../../tokens/special/Number"));
const Bracket_1 = require("../../tokens/special/Bracket");
class InjectMultiplicationByNegation extends Process_1.Traceable {
    run(input) {
        input = input;
        return InjectMultiplicationByNegation.injectMultiplication(input);
    }
    static injectMultiplication(input) {
        let occurrence = InjectMultiplicationByNegation.findPattern(input.tokens);
        if (!occurrence.length)
            return input;
        let output = input;
        const multiplication = new Multiplication_1.default();
        const one = new Number_1.default(-1);
        for (let place of occurrence) {
            output = ExpressionBuilder_1.ExpressionBuilder.removeToken(output, place);
            output = ExpressionBuilder_1.ExpressionBuilder.injectToken(output, multiplication, "*", place);
            output = ExpressionBuilder_1.ExpressionBuilder.injectToken(output, one, "-1", place);
        }
        return output;
    }
    static findPattern(tokens) {
        const positions = new Array();
        for (let i = 0; i < tokens.length - 1; i++) {
            const prev = tokens[i - 1];
            const current = tokens[i];
            const next = tokens[i + 1];
            const divisionByNegative = (prev && prev.id === "Division") && current.id === "Subtraction";
            const multiplicationByNegative = (prev && prev.id === "Multiplication") && current.id === "Subtraction";
            const negativeFunction = current.id === "Subtraction"
                && (!prev || (prev.type === Token_1.TokenTypes.Bracket && prev.variant === Bracket_1.BracketVariant.Open))
                && next.type === Token_1.TokenTypes.Function;
            const test = divisionByNegative || multiplicationByNegative || negativeFunction;
            if (test) {
                positions.push(i + positions.length);
            }
        }
        return positions;
    }
}
exports.default = InjectMultiplicationByNegation;
