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
const Process_1 = require("../../../Process");
const Abs_1 = __importStar(require("../../tokens/functions/Abs"));
const ExpressionBuilder_1 = require("../../../../Expression/ExpressionBuilder");
const Bracket_1 = require("../../tokens/special/Bracket");
const Bracket_2 = __importDefault(require("../../tokens/special/Bracket"));
class AbsolutDelimiters extends Process_1.Traceable {
    run(input) {
        input = input;
        return this.replaceDelimiters(input);
    }
    replaceDelimiters(input) {
        const tokens = input.tokens;
        let isOpened = false;
        for (let i = 0; i < tokens.length; i++) {
            const current = tokens[i];
            if (!Abs_1.isAbsoluteDelimiter(current))
                continue;
            if (!isOpened) {
                input = this.injectAbsoluteStart(input, i);
                isOpened = true;
                i++;
            }
            else {
                input = this.injectAbsoluteEnd(input, i);
                isOpened = false;
            }
        }
        return input;
    }
    injectAbsoluteStart(input, place) {
        let output = ExpressionBuilder_1.ExpressionBuilder.removeToken(input, place);
        const bracket = new Bracket_2.default("Round", Bracket_1.BracketVariant.Open, "(");
        output = ExpressionBuilder_1.ExpressionBuilder.injectToken(output, bracket, "(", place);
        const absoluteToken = new Abs_1.default();
        output = ExpressionBuilder_1.ExpressionBuilder.injectToken(output, absoluteToken, "abs", place);
        return output;
    }
    injectAbsoluteEnd(input, place) {
        const bracket = new Bracket_2.default("Round", Bracket_1.BracketVariant.Close, ")");
        let output = ExpressionBuilder_1.ExpressionBuilder.injectToken(input, bracket, ")", place);
        return ExpressionBuilder_1.ExpressionBuilder.removeToken(output, place + 1);
    }
}
exports.default = AbsolutDelimiters;
