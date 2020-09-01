"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Process_1 = require("../../../Process");
const Token_1 = require("../../tokens/Token");
class ReduceSpacer extends Process_1.Traceable {
    run(input) {
        input = input;
        return ReduceSpacer.removeSpacers(input);
    }
    static removeSpacers(input) {
        const tokens = input.tokens.filter(token => token.type !== Token_1.TokenTypes.Spacer);
        input.tokens = tokens;
        return input;
    }
}
exports.default = ReduceSpacer;
