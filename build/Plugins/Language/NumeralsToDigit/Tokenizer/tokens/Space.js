"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class Space extends Token_1.Token {
}
exports.default = Space;
Space.construct = Space;
Space.dictionary = {
    space: {
        pattern: /^\s+/,
        value: " ",
    },
};
