"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../Token");
class Factorial {
    constructor() {
        this.test = ["!"];
        this.priority = 3;
        this.value = (args) => {
            if (args.length !== 1) {
                throw new RangeError(this.id + " operation expected exactly one argument");
            }
            let n = args[0];
            let result = 1;
            if (Math.floor(n) != n) {
                throw new RangeError('Attempt to calculate factorial from not integer number ' + n);
            }
            else if (n <= 0) {
                throw new RangeError('Attempt to calculate factorial from not positive number (' + n + ')');
            }
            else {
                for (let i = n; i > 0; i--) {
                    result *= i;
                }
            }
            return result;
        };
    }
    get id() {
        return "Factorial";
    }
    ;
    get type() {
        return Token_1.TokenTypes.Operation;
    }
    ;
    get argLength() {
        return 1;
    }
}
exports.default = Factorial;
