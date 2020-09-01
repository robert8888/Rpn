"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Process_1 = require("../Process");
const TokenFactory_1 = __importDefault(require("./tokens/TokenFactory"));
const ExpressionBuilder_1 = require("../../Expression/ExpressionBuilder");
const Position_1 = __importDefault(require("./tokens/Position"));
const Validator_1 = require("./Validator/Validator");
class Tokenizer extends Process_1.Traceable {
    constructor() {
        super();
        this.tokens = Array();
        const factory = new TokenFactory_1.default();
        this.tokens = factory.produce();
    }
    run(input) {
        return this.tokenize(input);
    }
    tokenize(input) {
        const expressionBuilder = new ExpressionBuilder_1.ExpressionBuilder();
        let position = 0;
        let init = -1;
        let current = input;
        while (init !== position) {
            init = position;
            for (let token of this.tokens) {
                let _token;
                let origin;
                if (token.test instanceof Array) {
                    for (let pattern of token.test) {
                        if (typeof pattern === "string") {
                            if (!current.startsWith(pattern))
                                continue;
                            origin = current.substr(0, pattern.length);
                            current = current.substr(pattern.length);
                            position += pattern.length;
                            _token = token;
                        }
                        else {
                            const match = pattern.exec(current);
                            if (!match)
                                continue;
                            origin = current.substr(0, match[0].length);
                            current = current.substr(match[0].length);
                            position += match[0].length;
                            _token = token;
                        }
                        if (_token)
                            break;
                    }
                }
                else if (typeof token.test === "function") {
                    let length = token.test(current);
                    if (!length)
                        continue;
                    origin = current.substr(0, length);
                    current = current.substr(length);
                    position += length;
                    _token = token;
                }
                if (_token && origin) {
                    expressionBuilder.push(_token, new Position_1.default(init, position), origin);
                    break;
                }
            }
        }
        if (expressionBuilder.getEndPositionOfLast() < input.length) {
            const position = expressionBuilder.getEndPositionOfLast() + 1;
            expressionBuilder.pushError(new Validator_1.ValidationError("TokenizerNotRecognized", "Not recognized sign at: " + position, position));
        }
        return expressionBuilder.build();
    }
}
exports.default = Tokenizer;
