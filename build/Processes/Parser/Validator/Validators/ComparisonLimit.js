"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Process_1 = require("../../../../Process/Process");
const ExpressionBuilder_1 = require("../../../../Expression/ExpressionBuilder");
const Token_1 = require("../../tokens/Token");
const Validator_1 = require("../Validator");
class ComparisonLimit extends Process_1.Traceable {
    run(input) {
        input = input;
        return ComparisonLimit.check(input);
    }
    static check(input) {
        const tokens = input.tokens;
        let comparison = 0;
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type === Token_1.TokenTypes.Comparison) {
                comparison++;
            }
        }
        if (comparison > 1) {
            ExpressionBuilder_1.ExpressionBuilder.pushError(input, new Validator_1.ValidationError("ComparisonsLimit", "In expression can be only one comparison operation"));
        }
        return input;
    }
}
exports.default = ComparisonLimit;
