import {IExpression, Stack} from "../Expression";
import {Position, Token} from "../Tokenizer/Token";
import Numeral from "../Tokenizer/tokens/numerals/Numeral";
import Space from "../Tokenizer/tokens/Space";
import Idle from "../Tokenizer/tokens/Idle";
import {IProcess, Traceable} from "../../../../Process/Process";

export default class Converter extends Traceable implements IProcess{
    run(input: IExpression): IExpression{
        return this.convertNumerals(input);
    }

    private nextNotSpace(tokens: Token[], from: number): Token | null{
        for(let i = from + 1 ; i < tokens.length; i++){
            if(!(tokens[i] instanceof Space)){
                return tokens[i];
            }
        }
        return null;
    }

    private convertNumerals(input: IExpression): IExpression{
        const numbers = new Array<{from:number, to:number, token: Token }>();
        const tokens = input.tokens//.filter(token => !(token instanceof Space))

        for(let i = 0 ; i < tokens.length; i++){
            const digitQueue = new Array<Token>();
            let k = i;
            while((tokens[k] instanceof Numeral || tokens[k] instanceof Space) && k < tokens.length){
                if(tokens[k] instanceof Space){
                    k++;
                    continue;
                }
                digitQueue.push(tokens[k]);
                const current = tokens[k]
                const next = this.nextNotSpace(tokens, k);
                k++;
             //   console.log("Befreo break", <number>current.value ,  <number>next.value)
                if(<number>current.value / 10 < 1 && (next instanceof Numeral) && (<number>next.value / 10)  < 1){
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

    private numberFromDigitQueue(queue: Token[]): Idle{
        let value = 0;
   //     console.log("the digit quueue", queue);
        for(let i = 0 ; i < queue.length; i++){
            const current = queue[i];
            const next = queue[i + 1];
            if(current.value < (next && next.value || 0)){
                value += <number>current.value * <number>next.value;
                i++
            } else {
                value += <number>current.value;
            }
        }
     //   console.log("out value", value)
        return new Idle(new Position(queue[0].position.start, queue[queue.length - 1].position.end), value.toString());
    }

    private replaceTokens(expression: IExpression, replacers: {from:number, to:number, token: Token }[]): IExpression{
      //  console.log("replaceres", replacers)
        let tokens = <Token[]>expression.tokens;
        for(let replacer of replacers){
            tokens.splice(replacer.from, replacer.to - replacer.from  + 1, replacer.token);
        }
        expression.tokens = new Stack<Token>(...tokens);
        return expression;
    }
}