"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenizersFactory_1 = __importDefault(require("./Tokenizer/TokenizersFactory"));
const Tokenizer_1 = __importDefault(require("./Tokenizer/Tokenizer"));
const index_1 = require("../../../index");
class NumeralsToDigit extends index_1.Processor {
    get id() { return this.constructor.name; }
    ;
    constructor(dictionary) {
        super();
        TokenizersFactory_1.default.dictionary = dictionary;
        this.use(new Tokenizer_1.default());
    }
    compute(input) {
        return input;
    }
    run(input) {
        return this.compute(input);
    }
}
exports.default = NumeralsToDigit;
