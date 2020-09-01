"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stack extends Array {
    get top() {
        return this[this.length - 1];
    }
    get isEmpty() {
        return !this.length;
    }
}
exports.default = Stack;
