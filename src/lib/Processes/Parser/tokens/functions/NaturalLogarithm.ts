import {IFunctionalToken, TokenTypes} from "../Token";

export default class NaturalLogarithm implements IFunctionalToken {
    public get id() {
        return "NaturalLogarithm"
    };

    public get type() {
        return TokenTypes.Function
    };

    public test = ["ln"];
    public priority = 3;

    public get argLength() {
        return 1;
    }

    public value = (args: Array<number>) =>  {
        if (args.length !== 1) {
            throw new RangeError(this.id + " operation expect exactly one argument")
        }
        const arg = args[0];
        if (arg < 0) {
            throw new RangeError(this.id + " attempt to calculate logarithm from negative argument")
        }

        return Math.log(arg);
    }
}