"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack extends Array {
    get last() { return this[this.length - 1]; }
}
exports.Stack = Stack;
class Expression {
    constructor(origin) {
        this.origin = origin;
        this.tokens = new Stack();
    }
}
exports.default = Expression;
