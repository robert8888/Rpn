import {IPosition} from "./Position";

export enum TokenTypes {
    Number = "Number",
    Variable = "Variable",
    Operation = "Operation",
    Function = "Function",
    Bracket = "Bracket",
    Separator = "Separator",
    Spacer = "Spacer",
    Comparison = "Comparison"
}



export interface IToken {
    id: string;
    readonly type: TokenTypes;
    test: Array<string | RegExp> | ((input: string) => number);

    origin?: string;
    position?: IPosition
}

export interface IValuableToken extends IToken{
    value: number | ((args: Array<number>) => number | boolean) | null;
}

export interface IFunctionalToken extends IValuableToken{
    readonly argLength: number;
    readonly priority: number;
}

export function isFunctionalToken (token : Token ): token is Token{
    return (<IFunctionalToken>token).argLength !== undefined &&
        [TokenTypes.Operation , TokenTypes.Function , TokenTypes.Comparison].includes(token.type)
}

export type Token = IToken | IValuableToken | IFunctionalToken;
