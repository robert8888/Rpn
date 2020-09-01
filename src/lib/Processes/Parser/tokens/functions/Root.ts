import {IFunctionalToken, TokenTypes} from "../Token";

export default class Root implements IFunctionalToken {
    public get id() {
        return "Root"
    };

    public get type() {
        return TokenTypes.Function
    };

    public test = ["root"];
    public priority = 3;

    public get argLength() {
        return 2;
    }

    public value = (args: Array<number>) =>  {
        if (args.length !== 2) {
            throw new RangeError(this.id + " operation expect two arguments")
        }
        return Math.pow(args[0], 1 / args[1]);
    }
}