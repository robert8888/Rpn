"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.Position = void 0;
class Position {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}
exports.Position = Position;
class Token {
    constructor(position, value) {
        this.position = position;
        this.value = value;
    }
    static test(input, dictionary) {
        for (let test of Object.values(dictionary)) {
            if (!test.pattern)
                continue;
            if (test.pattern instanceof RegExp) {
                const match = test.pattern.exec(input);
                if (match) {
                    return {
                        value: test.value,
                        length: match[0].length
                    };
                }
            }
            else {
                if (input.startsWith(test.pattern)) {
                    return {
                        value: test.value,
                        length: test.pattern.length,
                    };
                }
            }
        }
        return null;
    }
    static get(input, offset) {
        const match = Token.test(input, this.dictionary);
        if (match) {
            return new this.construct(new Position(offset, offset + match.length), match.value);
        }
    }
}
exports.Token = Token;
Token.construct = Token;
Token.dictionary = {};
