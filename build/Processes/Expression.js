"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expression = void 0;
class Expression {
    constructor() {
        this.tokens = Array();
        this.details = {
            that: this,
            get length() {
                return this.that.tokens.length || 0;
            }
        };
        this.that = this;
    }
}
exports.Expression = Expression;
