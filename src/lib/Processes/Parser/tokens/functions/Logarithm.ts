import {IFunctionalToken, TokenTypes} from "../Token";

export default class Logarithm implements IFunctionalToken {
    public get id() {
        return "Logarithm"
    };

    public get type() {
        return TokenTypes.Function
    };

    public test = ["log"];
    public priority = 3;

    public get argLength() {
        return 2;
    }

    public value = (args: Array<number>) =>  {
        if (args.length !== 2) {
            throw new RangeError(this.id + " operation expect two arguments")
        }
        const arg = args[0];
        const base = args[1];
        if (arg < 0) {
            throw new RangeError(this.id + " attempt to calculate logarithm from negative argument")
        }
        if (base <= 0) {
            throw new RangeError(this.id + " logarithm base have to be positive number")
        }
        return Math.log(arg) / Math.log(base);
    }
}