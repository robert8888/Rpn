"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageEn = void 0;
const NumeralsToDigit_1 = __importDefault(require("./NumeralsToDigit/NumeralsToDigit"));
const en_1 = __importDefault(require("./dictionaries/en"));
function Language(dictionary) {
    return (processor) => {
        processor.use(new NumeralsToDigit_1.default(dictionary), () => 0);
    };
}
exports.default = Language;
function LanguageEn() {
    return Language(en_1.default);
}
exports.LanguageEn = LanguageEn;
