"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenizersFactory_1 = __importDefault(require("./TokenizersFactory"));
const Expression_1 = __importDefault(require("../Expression"));
const Idle_1 = __importDefault(require("./tokens/Idle"));
const Token_1 = require("./Token");
const Process_1 = require("../../../../Process/Process");
class Tokenizer extends Process_1.Traceable {
    constructor() {
        super();
        this.tokenizers = new TokenizersFactory_1.default().produce();
    }
    run(input) {
        const expression = new Expression_1.default(input);
        let current = input.toLowerCase();
        let position = 0;
        while (position < input.length) {
            let length = 1;
            for (let tokenizer of this.tokenizers) {
                const token = tokenizer.get(current, position);
                if (token) {
                    const lastEnd = expression.tokens.last && expression.tokens.last.position.end || 0;
                    if (lastEnd !== position) {
                        const idle = new Idle_1.default(new Token_1.Position(lastEnd, position), input.substr(lastEnd, position - lastEnd));
                        expression.tokens.push(idle);
                    }
                    expression.tokens.push(token);
                    length = token.position.end - token.position.start;
                    break;
                }
            }
            position += length;
            current = current.substr(length);
        }
        return expression;
    }
}
exports.default = Tokenizer;
