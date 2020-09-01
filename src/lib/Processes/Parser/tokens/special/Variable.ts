import {IValuableToken, TokenTypes} from "../Token";

export interface IVariableToken extends IValuableToken{
    readonly name: string;
}

export default class Variable implements IVariableToken {
    public get id() {
        return "Variable"
    };

    public get type() {
        return TokenTypes.Variable
    };

    public value = null;

    private _name: string | undefined;

    public get name() {
        return this._name || "";
    }

    public test(input: string) {
        const pattern = /^(?<name>[a-z])(?=[^a-z]|$)/
        const match = pattern.exec(input)
        if (!match) return 0;
        this._name = match.groups?.name;
        return match[0].length;
    }
}