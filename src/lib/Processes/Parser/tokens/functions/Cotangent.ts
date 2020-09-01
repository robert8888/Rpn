import {IFunctionalToken, TokenTypes} from "../Token";

export default class Cotangent implements IFunctionalToken {
    public get id() {
        return "Cotangent"
    };

    public get type() {
        return TokenTypes.Function
    };

    public test = ["ctg"];
    public priority = 3;

    public get argLength() {
        return 1;
    }

    public value = (args: Array<number>) =>  {
        if (args.length !== 1) {
            throw new RangeError(this.id + " operation expect exactly one arguments")
        }
        return 1 / Math.tan(args[0]);
    }
}