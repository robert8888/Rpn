"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunctionalToken = exports.TokenTypes = void 0;
var TokenTypes;
(function (TokenTypes) {
    TokenTypes["Number"] = "Number";
    TokenTypes["Variable"] = "Variable";
    TokenTypes["Operation"] = "Operation";
    TokenTypes["Function"] = "Function";
    TokenTypes["Bracket"] = "Bracket";
    TokenTypes["Separator"] = "Separator";
    TokenTypes["Spacer"] = "Spacer";
    TokenTypes["Comparison"] = "Comparison";
})(TokenTypes = exports.TokenTypes || (exports.TokenTypes = {}));
function isFunctionalToken(token) {
    return token.argLength !== undefined &&
        [TokenTypes.Operation, TokenTypes.Function, TokenTypes.Comparison].includes(token.type);
}
exports.isFunctionalToken = isFunctionalToken;
