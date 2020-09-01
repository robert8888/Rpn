import {IFunctionalToken, TokenTypes} from "../Token";

export default class SquareRoot implements IFunctionalToken {
    public get id() {
        return "SquareRoot"
    };

    public get type() {
        return TokenTypes.Function
    };

    public test = ["sqrt"];
    public priority = 3;

    public get argLength() {
        return 1;
    }

    public value = (args: Array<number>) =>  {
        if (args.length !== 1) {
            throw new RangeError(this.id + " operation expect exactly one argument")
        }
        return Math.sqrt(args[0]);
    }
}