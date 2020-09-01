import {IFunctionalToken, TokenTypes} from "../Token";

export default class Power implements IFunctionalToken {
    public get id() {
        return "Power"
    };

    public get type() {
        return TokenTypes.Function
    };

    public test = ["pow"];
    public priority = 3;

    public get argLength() {
        return 2;
    }

    public value = (args: Array<number>) =>  {
        if (args.length !== 2) {
            throw new RangeError(this.id + " operation expect exactly one arguments")
        }
        return Math.pow(args[1], args[0]);
    }
}