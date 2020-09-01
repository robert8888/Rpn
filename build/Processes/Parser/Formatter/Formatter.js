"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Processor_1 = __importDefault(require("../../../Processor/Processor"));
const ReduceDuplicated_1 = __importDefault(require("./Formatters/ReduceDuplicated"));
const RemoveSpacers_1 = __importDefault(require("./Formatters/RemoveSpacers"));
const InjectMultiplication_1 = __importDefault(require("./Formatters/InjectMultiplication"));
const RemoveStartOperation_1 = __importDefault(require("./Formatters/RemoveStartOperation"));
const InjectMultiplicationByNegation_1 = __importDefault(require("./Formatters/InjectMultiplicationByNegation"));
const AbsolutDelimiters_1 = __importDefault(require("./Formatters/AbsolutDelimiters"));
class Formatter extends Processor_1.default {
    constructor() {
        super();
        this.id = this.constructor.name;
        this.use(new RemoveSpacers_1.default());
        this.use(new AbsolutDelimiters_1.default());
        this.use(new InjectMultiplication_1.default());
        this.use(new ReduceDuplicated_1.default());
        this.use(new InjectMultiplicationByNegation_1.default());
        this.use(new RemoveStartOperation_1.default());
    }
    run(input) {
        return this.compute(input);
    }
}
exports.default = Formatter;
