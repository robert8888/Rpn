import {IFunctionalToken, TokenTypes} from "../Token";


export default class Equality implements IFunctionalToken{
    public get id() {
        return "Equality"
    };

    public get type() {
        return TokenTypes.Comparison
    };

    public test = ["="];
    public priority = 0;

    public get argLength() {
        return 2;
    }

    public value = (args: Array<number>) =>  {
        if (args.length !== 2) {
            throw new RangeError("Comparison operation expect two arguments")
        }

        return Math.abs(args[0] - args[1]) < .1 ** 6;
    }
}