"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Processor_1 = __importDefault(require("../../Processor/Processor"));
const Tokenizer_1 = __importDefault(require("./Tokenizer"));
const PreFormatter_1 = __importDefault(require("./PreFormatter"));
const Formatter_1 = __importDefault(require("./Formatter/Formatter"));
const Validator_1 = __importDefault(require("./Validator/Validator"));
class Parser extends Processor_1.default {
    constructor() {
        super();
        this.id = this.constructor.name;
        this.use(new PreFormatter_1.default());
        this.use(new Tokenizer_1.default());
        this.use(new Formatter_1.default());
        this.use(new Validator_1.default());
    }
    run(input) {
        return this.compute(input);
    }
}
exports.default = Parser;
