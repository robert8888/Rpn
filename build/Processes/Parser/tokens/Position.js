"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Position {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.shift = 0;
    }
    get original() {
        return this.start - this.shift;
    }
}
exports.default = Position;
