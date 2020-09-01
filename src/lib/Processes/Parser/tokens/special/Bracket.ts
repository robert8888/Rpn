import {IToken, TokenTypes} from "../Token";

export enum BracketVariant {
    Open = "Open",
    Close = "Close"
}

export interface IBracketToken extends IToken{
    readonly subtype: string;
    readonly variant: BracketVariant
}

export default class Bracket implements  IBracketToken {
    public get id() {
        return "Bracket"
    };

    public get type() {
        return TokenTypes.Bracket
    };

    public test: Array<string | RegExp>;

    constructor(
        public readonly subtype: string,
        public readonly variant: BracketVariant,
        pattern: string | RegExp | Array<string | RegExp>) {
            if (!(pattern instanceof Array)) {
                pattern = new Array<string | RegExp>(pattern);

            }
            this.test = pattern;
    }
}