"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Process_1 = require("../../../Process");
const Token_1 = require("../../tokens/Token");
const Bracket_1 = require("../../tokens/special/Bracket");
const Multiplication_1 = __importDefault(require("../../tokens/operations/Multiplication"));
const ExpressionBuilder_1 = require("../../../../Expression/ExpressionBuilder");
class InjectMultiplication extends Process_1.Traceable {
    run(input) {
        input = input;
        return InjectMultiplication.injectMultiplication(input);
    }
    static injectMultiplication(input) {
        let occurrence = InjectMultiplication.findPattern(input.tokens);
        if (!occurrence.length)
            return input;
        let output = input;
        const multiplication = new Multiplication_1.default();
        for (let place of occurrence) {
            output = ExpressionBuilder_1.ExpressionBuilder.injectToken(output, multiplication, "*", place);
        }
        return output;
    }
    static findPattern(tokens) {
        const positions = new Array();
        for (let i = 0; i < tokens.length - 1; i++) {
            let current = tokens[i];
            let next = tokens[i + 1];
            const bracketByBracket = current.type === Token_1.TokenTypes.Bracket && current.variant === Bracket_1.BracketVariant.Close
                && next.type === Token_1.TokenTypes.Bracket && next.variant === Bracket_1.BracketVariant.Open;
            const numberByBracket = [Token_1.TokenTypes.Number, Token_1.TokenTypes.Variable].includes(current.type)
                && next.type === Token_1.TokenTypes.Bracket && next.variant === Bracket_1.BracketVariant.Open;
            const bracketByNumber = current.type === Token_1.TokenTypes.Bracket && current.variant === Bracket_1.BracketVariant.Close
                && [Token_1.TokenTypes.Number, Token_1.TokenTypes.Variable].includes(next.type);
            const numberByVariable = current.type === Token_1.TokenTypes.Variable && [Token_1.TokenTypes.Number, Token_1.TokenTypes.Variable].includes(next.type);
            const variableByNumber = next.type === Token_1.TokenTypes.Variable && [Token_1.TokenTypes.Number, Token_1.TokenTypes.Variable].includes(current.type);
            const numberByFunction = [Token_1.TokenTypes.Number, Token_1.TokenTypes.Variable].includes(current.type) && next.type === Token_1.TokenTypes.Function;
            const numberByNumber = [Token_1.TokenTypes.Number, Token_1.TokenTypes.Variable].includes(current.type)
                && [Token_1.TokenTypes.Number, Token_1.TokenTypes.Variable].includes(next.type);
            const test = bracketByBracket || numberByBracket || bracketByNumber ||
                numberByVariable || variableByNumber || numberByFunction || numberByNumber;
            if (test) {
                positions.push(i + 1 + positions.length);
            }
        }
        return positions;
    }
}
exports.default = InjectMultiplication;
