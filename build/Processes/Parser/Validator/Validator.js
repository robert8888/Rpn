"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const Processor_1 = __importDefault(require("../../../Processor/Processor"));
const BracketMismatch_1 = __importDefault(require("./Validators/BracketMismatch"));
const EmptyBrackets_1 = __importDefault(require("./Validators/EmptyBrackets"));
const FunctionBrackets_1 = __importDefault(require("./Validators/FunctionBrackets"));
const FunctionArguments_1 = __importDefault(require("./Validators/FunctionArguments"));
const ComaPosition_1 = __importDefault(require("./Validators/ComaPosition"));
const ComparisonLimit_1 = __importDefault(require("./Validators/ComparisonLimit"));
const Expression_1 = require("../../../Expression/Expression");
class ValidationError extends Expression_1.ExpressionError {
}
exports.ValidationError = ValidationError;
;
class Validator extends Processor_1.default {
    constructor() {
        super();
        this.id = this.constructor.name;
        this.use(new BracketMismatch_1.default());
        this.use(new FunctionArguments_1.default());
        this.use(new EmptyBrackets_1.default());
        this.use(new FunctionBrackets_1.default());
        this.use(new ComaPosition_1.default());
        this.use(new ComparisonLimit_1.default());
    }
    run(input) {
        return this.compute(input);
    }
}
exports.default = Validator;
