import {IFunctionalToken, TokenTypes} from "../Token";

export default class Tangent implements IFunctionalToken {
    public get id() {
        return "Tangent"
    };

    public get type() {
        return TokenTypes.Function
    };

    public test = ["tan", "tg"];
    public priority = 3;

    public get argLength() {
        return 1;
    }

    public value = (args: Array<number>) => {
        if (args.length !== 1) {
            throw new RangeError(this.id + " operation expect exactly one arguments")
        }
        return Math.tan(args[0]);
    }
}