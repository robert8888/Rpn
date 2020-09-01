import {IToken, TokenTypes} from "../Token";


export default class Coma implements IToken {
    public get id() {
        return "Coma"
    };

    public get type() {
        return TokenTypes.Separator
    };

    public test = [","];
}