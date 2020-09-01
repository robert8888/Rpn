import {IToken, TokenTypes} from "../Token";


export default class Space implements IToken {
    public get id() {
        return "Spacer"
    };

    public get type() {
        return TokenTypes.Spacer
    };

    public test = [/^\s+/];
}