import {IFunctionalToken, TokenTypes} from "../Token";

export default class Square implements IFunctionalToken {
    public get id() {
        return "Square"
    };

    public get type() {
        return TokenTypes.Operation
    };

    public test = ["^"];
    public priority = 3;

    public get argLength() {
        return 1;
    }

    public value = (args: Array<number>) => {
        if (args.length !== 1) {
            throw new RangeError(this.id + " operation expected exactly one argument")
        }
        return args[0] ** 2;
    }
}