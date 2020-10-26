"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Numeral_1 = __importDefault(require("./Numeral"));
class Thousand extends Numeral_1.default {
}
exports.default = Thousand;
Thousand.construct = Thousand;
Thousand.dictionary = {
    1000: {
        pattern: "",
        value: 1000
    }
};
