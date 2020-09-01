import {Token, TokenTypes} from "../Processes/Parser/tokens/Token";
import {IVariableToken} from "../Processes/Parser/tokens/special/Variable";
import {data} from "../Processor/Processor";


export class ExpressionError extends Error {
    public position: number | undefined;

    constructor(public id: string, message: string, position?: number) {
        super(message);
        this.position = position;
    }
}

export interface IExpression {
    tokens: Array<Token>
    errors?: Array<ExpressionError> | undefined
    value: number | boolean | null
    details: {
        readonly length: number
        readonly isFunction: boolean
        readonly funcVarNames: string[]
    }
    [Symbol.toPrimitive](): string;
}


export function isExpression(input: data) : input is IExpression {return true }

export class Expression implements IExpression {
    public tokens = Array<Token>();
    public value = null;

    public details = {
        that: this,
        get length() {
            return this.that.tokens.length || 0
        },
        get isFunction(){
            return this.that.tokens.some(token => token.type === TokenTypes.Variable)
        },
        get funcVarNames(){
            return [...new Set(this.that.tokens
                .filter(token => token.type === TokenTypes.Variable)
                .map( token => (<IVariableToken>token).name))]
        }
    }

    private _toString(){
        return this.tokens.reduce((acc:string, cur:Token)=>{
            return acc + cur.origin + " ";
        }, "").trimRight();
    }

    public [Symbol.toPrimitive](){
        return this._toString();
    }

    public toString(){
       return this._toString();
    }
}