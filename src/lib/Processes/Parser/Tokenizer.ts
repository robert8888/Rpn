import {IProcess, Traceable} from "../../Process/Process";
import {data} from "../../Processor/Processor";
import {IExpression} from "../../Expression/Expression";
import {Token} from "./tokens/Token";
import TokenFactory from "./tokens/TokenFactory";
import {ExpressionBuilder} from "../../Expression/ExpressionBuilder";
import Position from "./tokens/Position";
import {ValidationError} from "./Validator/Validator";

export default class Tokenizer extends Traceable implements IProcess {
    public tokens = Array<Token>();

    constructor() {
        super();
        const factory = new TokenFactory();
        this.tokens = factory.produce();
    }

    public run(input: data) {
        return this.tokenize(<string>input);
    }

    private tokenize(input: string): IExpression {
        const expressionBuilder = new ExpressionBuilder();
        let position = 0;
        let init = -1;
        let current = input;
        while (init !== position) {
            init = position;
            for (let token of this.tokens) {
                let _token: Token | undefined;
                let origin: string | undefined;
                if (token.test instanceof Array) {
                    for (let pattern of token.test) {
                        if (typeof pattern === "string") {
                            if (!current.startsWith(pattern)) continue;

                            origin = current.substr(0, pattern.length);
                            current = current.substr(pattern.length);
                            position += pattern.length;

                            _token = token;
                        } else {
                            const match = pattern.exec(current);
                            if (!match) continue;

                            origin = current.substr(0, match[0].length);
                            current = current.substr(match[0].length);
                            position += match[0].length;

                            _token = token;
                        }
                        if (_token) break;
                    }
                } else if (typeof token.test === "function") {
                    let length = token.test(current);
                    if (!length) continue;

                    origin = current.substr(0, length);
                    current = current.substr(length);
                    position += length;

                    _token = token;
                }

                if (_token && origin) {
                    expressionBuilder.push(_token, new Position(init, position), origin)
                    break;
                }
            }
        }

        if(expressionBuilder.getEndPositionOfLast() < input.length){
            const position = expressionBuilder.getEndPositionOfLast() + 1;
            expressionBuilder.pushError(new ValidationError(
                "TokenizerNotRecognized",
                "Not recognized sign at: " + position,
                position
            ))
        }

        return expressionBuilder.build();
    }
}