"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Numeral_1 = __importDefault(require("./Numeral"));
class Hundredths extends Numeral_1.default {
}
exports.default = Hundredths;
Hundredths.construct = Hundredths;
Hundredths.dictionary = {
    0.01: {
        pattern: "",
        value: 0.01
    }
};
