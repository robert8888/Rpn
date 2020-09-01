import {IToken, Token} from "./Tokenizer/Token";

export class Stack<T> extends Array<T> {
    get last(): T{ return this[this.length - 1];}
}

export interface IExpression {
    tokens: Stack<IToken>
}

export default class Expression implements IExpression{
    tokens = new Stack<IToken>()

    constructor(public origin: string) {}
}