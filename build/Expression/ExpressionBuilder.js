"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionBuilder = void 0;
const Expression_1 = require("./Expression");
const Position_1 = __importDefault(require("../Processes/Parser/tokens/Position"));
const DeepClone_1 = __importDefault(require("../Utils/DeepClone"));
class ExpressionBuilder {
    constructor() {
        this.expression = new Expression_1.Expression();
    }
    push(token, position, origin) {
        const tokenClone = DeepClone_1.default(token);
        if (position) {
            tokenClone.position = position;
        }
        if (origin) {
            tokenClone.origin = origin;
        }
        this.expression.tokens.push(tokenClone);
    }
    pushError(error) {
        ExpressionBuilder.pushError(this.expression, error);
    }
    getEndPositionOfLast() {
        var _a;
        const lastToken = this.expression.tokens[this.expression.details.length - 1];
        return ((_a = lastToken === null || lastToken === void 0 ? void 0 : lastToken.position) === null || _a === void 0 ? void 0 : _a.end) || 0;
    }
    build() {
        return this.expression;
    }
    static pushError(expression, error) {
        if (!expression.errors) {
            expression.errors = new Array();
        }
        expression.errors.push(error);
        return expression;
    }
    static injectToken(input, token, origin, place) {
        var _a, _b;
        token = DeepClone_1.default(token);
        token.position = new Position_1.default(((_a = input.tokens[place].position) === null || _a === void 0 ? void 0 : _a.end) || 0, origin.length + (((_b = input.tokens[place].position) === null || _b === void 0 ? void 0 : _b.end) || 0));
        token.origin = origin;
        input.tokens.splice(place, 0, token);
        for (let i = place; i < input.tokens.length; i++) {
            let token = input.tokens[i];
            if (!token.position)
                continue;
            token.position.start += origin.length;
            token.position.end += origin.length;
            token.position.shift += origin.length;
        }
        return input;
    }
    static removeToken(input, position) {
        var _a;
        const length = ((_a = input.tokens[position].origin) === null || _a === void 0 ? void 0 : _a.length) || 0;
        input.tokens.splice(position, 1);
        for (let i = position; i < input.tokens.length; i++) {
            let token = input.tokens[i];
            if (!token.position)
                continue;
            token.position.start -= length;
            token.position.end -= length;
            token.position.shift -= length;
        }
        return input;
    }
}
exports.ExpressionBuilder = ExpressionBuilder;
