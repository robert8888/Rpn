"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Process_1 = require("../../../../Process/Process");
const Token_1 = require("../../tokens/Token");
const ExpressionBuilder_1 = require("../../../../Expression/ExpressionBuilder");
class RemoveStartOperation extends Process_1.Traceable {
    run(input) {
        input = input;
        return RemoveStartOperation.removeSpacers(input);
    }
    static removeSpacers(input) {
        let first = input.tokens[0];
        if (first && first.type === Token_1.TokenTypes.Operation && first.argLength == 2) {
            return ExpressionBuilder_1.ExpressionBuilder.removeToken(input, 0);
        }
        return input;
    }
}
exports.default = RemoveStartOperation;
