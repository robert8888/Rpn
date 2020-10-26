"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("../Expression");
const Token_1 = require("../Tokenizer/Token");
const Numeral_1 = __importDefault(require("../Tokenizer/tokens/numerals/Numeral"));
const Space_1 = __importDefault(require("../Tokenizer/tokens/Space"));
const Idle_1 = __importDefault(require("../Tokenizer/tokens/Idle"));
const Process_1 = require("../../../../Process/Process");
class Converter extends Process_1.Traceable {
    run(input) {
        return this.convertNumerals(input);
    }
    nextNotSpace(tokens, from) {
        for (let i = from + 1; i < tokens.length; i++) {
            if (!(tokens[i] instanceof Space_1.default)) {
                return tokens[i];
            }
        }
        return null;
    }
    convertNumerals(input) {
        const numbers = new Array();
        const tokens = input.tokens; //.filter(token => !(token instanceof Space))
        for (let i = 0; i < tokens.length; i++) {
            const digitQueue = new Array();
            let k = i;
            while ((tokens[k] instanceof Numeral_1.default || tokens[k] instanceof Space_1.default) && k < tokens.length) {
                if (tokens[k] instanceof Space_1.default) {
                    k++;
                    continue;
                }
                digitQueue.push(tokens[k]);
                const current = tokens[k];
                const next = this.nextNotSpace(tokens, k);
                k++;
                //   console.log("Befreo break", <number>current.value ,  <number>next.value)
                if (current.value / 10 < 1 && (next instanceof Numeral_1.default) && (next.value / 10) < 1) {
                    //  console.log("break", current, next)
                    break;
                }
            }
            //    console.log("the digits", digitQueue)
            numbers.push({
                from: i,
                to: k,
                token: this.numberFromDigitQueue(digitQueue)
            });
            i = k - 1;
        }
        // console.log("the numbers", numbers)
        return this.replaceTokens(input, numbers);
    }
    numberFromDigitQueue(queue) {
        let value = 0;
        //     console.log("the digit quueue", queue);
        for (let i = 0; i < queue.length; i++) {
            const current = queue[i];
            const next = queue[i + 1];
            if (current.value < (next && next.value || 0)) {
                value += current.value * next.value;
                i++;
            }
            else {
                value += current.value;
            }
        }
        //   console.log("out value", value)
        return new Idle_1.default(new Token_1.Position(queue[0].position.start, queue[queue.length - 1].position.end), value.toString());
    }
    replaceTokens(expression, replacers) {
        //  console.log("replaceres", replacers)
        let tokens = expression.tokens;
        for (let replacer of replacers) {
            tokens.splice(replacer.from, replacer.to - replacer.from + 1, replacer.token);
        }
        expression.tokens = new Expression_1.Stack(...tokens);
        return expression;
    }
}
exports.default = Converter;
