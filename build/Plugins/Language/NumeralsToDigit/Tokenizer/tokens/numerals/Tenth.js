"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Numeral_1 = __importDefault(require("./Numeral"));
class Tenth extends Numeral_1.default {
}
exports.default = Tenth;
Tenth.construct = Tenth;
Tenth.dictionary = {
    0.1: {
        pattern: "",
        value: 0.1
    }
};
