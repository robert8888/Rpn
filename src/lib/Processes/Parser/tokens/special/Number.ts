import {IValuableToken, TokenTypes} from "../Token";

export default class Number implements IValuableToken {
    public get id() {
        return "Number"
    };

    constructor(value?: number) {
        this.value = value || 0;
    }


    public get type() {
        return TokenTypes.Number
    };

    public value = 0;

    public test = (input: string) => {
        const pattern = /^[-]?(?:(?:[0-9]+\.?[0-9]*)|(?:\.[0-9]+))/;
        const match = pattern.exec(input);
        if (!match) return 0;
        this.value = parseFloat(match[0]);
        return match[0].length;
    }
}