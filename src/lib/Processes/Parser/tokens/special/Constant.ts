import {IValuableToken, TokenTypes} from "../Token";

export default class Constant implements IValuableToken {
    public get type() {
        return TokenTypes.Number
    };

    public test: Array<string | RegExp>;

    constructor(
        public readonly id: string,
        public value: number,
        pattern: string | RegExp | Array<string | RegExp>) {
        if (!(pattern instanceof Array)) {
            pattern = new Array<string | RegExp>(pattern);

        }
        this.test = pattern;
    }
}