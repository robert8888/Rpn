"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Process_1 = require("../../../../Process/Process");
const Token_1 = require("../../tokens/Token");
class ReduceDuplicated extends Process_1.Traceable {
    run(input) {
        input = input;
        return ReduceDuplicated.reduceDuplicated(input);
    }
    static reduceDuplicated(input) {
        const tokens = new Array();
        input.tokens.forEach((token, index) => {
            if (index === input.tokens.length - 1) {
                tokens.push(token);
                return;
            }
            const current = input.tokens[index];
            const next = input.tokens[index + 1];
            const types = [Token_1.TokenTypes.Operation, Token_1.TokenTypes.Separator];
            const test = types.includes(current.type) && types.includes(next.type) && current.id === next.id;
            if (test)
                return;
            tokens.push(token);
        });
        input.tokens = tokens;
        return input;
    }
}
exports.default = ReduceDuplicated;
