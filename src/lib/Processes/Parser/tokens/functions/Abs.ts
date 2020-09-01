import {IFunctionalToken, Token, TokenTypes} from "../Token";

export function isAbsoluteDelimiter (token: Token) : token is IAbsoluteToken{
    return token.id === "Absolute" && (<IAbsoluteToken>token).isDelimiter;
}

export interface IAbsoluteToken extends IFunctionalToken {
    readonly isDelimiter: boolean
}

export default class Absolute implements IAbsoluteToken {
    private _isDelimiter = false;
    public get isDelimiter(){return this._isDelimiter}

    public get id() {
        return "Absolute"
    };

    public get type() {
        return TokenTypes.Function
    };

    public test = (input: string) => {
        if(input.startsWith("abs")) {
            return 3;
        } else if(input.startsWith("|")){
            this._isDelimiter = true;
            return 1;
        }
        return 0;
    }
    public priority = 3;

    public get argLength() {
        return 1;
    }

    public value = (args: Array<number>) =>  {
        if (args.length !== 1) {
            throw new RangeError(this.id + " operation expect exactly one arguments")
        }
        return Math.abs(args[0]);
    }
}