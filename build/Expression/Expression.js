"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expression = exports.isExpression = exports.ExpressionError = void 0;
const Token_1 = require("../Processes/Parser/tokens/Token");
class ExpressionError extends Error {
    constructor(id, message, position) {
        super(message);
        this.id = id;
        this.position = position;
    }
}
exports.ExpressionError = ExpressionError;
function isExpression(input) { return true; }
exports.isExpression = isExpression;
class Expression {
    constructor() {
        this.tokens = Array();
        this.value = null;
        this.details = {
            that: this,
            get length() {
                return this.that.tokens.length || 0;
            },
            get isFunction() {
                return this.that.tokens.some(token => token.type === Token_1.TokenTypes.Variable);
            },
            get funcVarNames() {
                return this.that.tokens
                    .filter(token => token.type === Token_1.TokenTypes.Variable)
                    .map(token => token.name);
            }
        };
    }
    _toString() {
        return this.tokens.reduce((acc, cur) => {
            return acc + cur.origin + " ";
        }, "").trimRight();
    }
    [Symbol.toPrimitive]() {
        return this._toString();
    }
    toString() {
        return this._toString();
    }
}
exports.Expression = Expression;
