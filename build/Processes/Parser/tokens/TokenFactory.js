"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bracket_1 = __importStar(require("./special/Bracket"));
const Variable_1 = __importDefault(require("./special/Variable"));
const Constant_1 = __importDefault(require("./special/Constant"));
const Number_1 = __importDefault(require("./special/Number"));
const Division_1 = __importDefault(require("./operations/Division"));
const Multiplication_1 = __importDefault(require("./operations/Multiplication"));
const Summation_1 = __importDefault(require("./operations/Summation"));
const Subtraction_1 = __importDefault(require("./operations/Subtraction"));
const Square_1 = __importDefault(require("./operations/Square"));
const Factorial_1 = __importDefault(require("./operations/Factorial"));
const Equality_1 = __importDefault(require("./comparisons/Equality"));
const Less_1 = __importDefault(require("./comparisons/Less"));
const Greater_1 = __importDefault(require("./comparisons/Greater"));
const LessOrEqual_1 = __importDefault(require("./comparisons/LessOrEqual"));
const GreaterOrEqual_1 = __importDefault(require("./comparisons/GreaterOrEqual"));
const Cosine_1 = __importDefault(require("./functions/Cosine"));
const Cotangent_1 = __importDefault(require("./functions/Cotangent"));
const Power_1 = __importDefault(require("./functions/Power"));
const Logarithm_1 = __importDefault(require("./functions/Logarithm"));
const NaturalLogarithm_1 = __importDefault(require("./functions/NaturalLogarithm"));
const Root_1 = __importDefault(require("./functions/Root"));
const Sine_1 = __importDefault(require("./functions/Sine"));
const SquareRoot_1 = __importDefault(require("./functions/SquareRoot"));
const Tanget_1 = __importDefault(require("./functions/Tanget"));
const Coma_1 = __importDefault(require("./special/Coma"));
const Space_1 = __importDefault(require("./special/Space"));
const Abs_1 = __importDefault(require("./functions/Abs"));
class TokenFactory {
    produce() {
        const tokens = new Array();
        tokens.push(...this.function());
        tokens.push(...this.comparison());
        tokens.push(...this.special());
        tokens.push(...this.operations());
        return tokens;
    }
    special() {
        return [
            new Constant_1.default("Constant_Pi", Math.PI, ["pi"]),
            new Constant_1.default("Constant_E", Math.E, ["e"]),
            new Constant_1.default("Constant_Deg", Math.PI / 180, ['deg']),
            new Bracket_1.default("Round", Bracket_1.BracketVariant.Open, "("),
            new Bracket_1.default("Round", Bracket_1.BracketVariant.Close, ")"),
            new Bracket_1.default("Square", Bracket_1.BracketVariant.Open, "["),
            new Bracket_1.default("Square", Bracket_1.BracketVariant.Close, "]"),
            new Coma_1.default(),
            new Space_1.default(),
            new Number_1.default(),
            new Variable_1.default(),
        ];
    }
    operations() {
        return [
            new Division_1.default(),
            new Multiplication_1.default(),
            new Summation_1.default(),
            new Subtraction_1.default(),
            new Square_1.default(),
            new Factorial_1.default(),
        ];
    }
    comparison() {
        return [
            new Equality_1.default(),
            new Less_1.default(),
            new Greater_1.default(),
            new LessOrEqual_1.default(),
            new GreaterOrEqual_1.default(),
        ];
    }
    function() {
        return [
            new Cosine_1.default(),
            new Cotangent_1.default(),
            new Logarithm_1.default(),
            new NaturalLogarithm_1.default(),
            new Power_1.default(),
            new Root_1.default(),
            new Sine_1.default(),
            new SquareRoot_1.default(),
            new Tanget_1.default(),
            new Abs_1.default(),
        ];
    }
}
exports.default = TokenFactory;
