"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Units_1 = __importDefault(require("./tokens/numerals/Units"));
const Dozens_1 = __importDefault(require("./tokens/numerals/Dozens"));
const Tens_1 = __importDefault(require("./tokens/numerals/Tens"));
const Hundreds_1 = __importDefault(require("./tokens/numerals/Hundreds"));
const Hundredths_1 = __importDefault(require("./tokens/numerals/Hundredths"));
const Thousand_1 = __importDefault(require("./tokens/numerals/Thousand"));
const Milions_1 = __importDefault(require("./tokens/numerals/Milions"));
const Billions_1 = __importDefault(require("./tokens/numerals/Billions"));
const Space_1 = __importDefault(require("./tokens/Space"));
const Tenth_1 = __importDefault(require("./tokens/numerals/Tenth"));
class TokenizersFactory {
    constructor() {
        for (let tokenizer of TokenizersFactory.tokenizers) {
            for (let key in tokenizer.dictionary) {
                if (TokenizersFactory.dictionary.hasOwnProperty(key)) {
                    // @ts-ignore
                    tokenizer.dictionary[key].pattern = TokenizersFactory.dictionary[key];
                }
            }
        }
    }
    produce() {
        return TokenizersFactory.tokenizers;
    }
}
exports.default = TokenizersFactory;
TokenizersFactory.tokenizers = [
    Hundredths_1.default,
    Tenth_1.default,
    Units_1.default,
    Dozens_1.default,
    Tens_1.default,
    Hundreds_1.default,
    Thousand_1.default,
    Milions_1.default,
    Billions_1.default,
    Space_1.default,
];
