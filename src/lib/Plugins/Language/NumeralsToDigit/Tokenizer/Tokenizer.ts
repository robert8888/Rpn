
import TokenizersFactory, {Tokenizers} from "./TokenizersFactory";
import Expression, {IExpression} from "../Expression";
import Idle from "./tokens/Idle";
import {Position} from "./Token";
import {IProcess, Traceable} from "../../../../Process/Process";

export default class Tokenizer extends Traceable implements IProcess{
    private readonly tokenizers: Tokenizers;

    constructor() {
        super();
        this.tokenizers = new TokenizersFactory().produce();
    }

    run(input: string): IExpression{
        const expression = new Expression(input);

        let current = input.toLowerCase();
        let position = 0;
        while(position < input.length){
            let length = 1;
            for(let tokenizer of this.tokenizers){
                const token = tokenizer.get(current, position);
                if(token){
                    const lastEnd = expression.tokens.last && expression.tokens.last.position.end || 0
                    if(lastEnd !== position){
                        const idle  = new Idle(new Position(lastEnd, position), input.substr(lastEnd, position - lastEnd))
                        expression.tokens.push(idle);
                    }

                    expression.tokens.push(token);
                    length = token.position.end - token.position.start;
                    break;
                }
            }
            position += length;
            current = current.substr(length);
        }

        return expression;
    }
}