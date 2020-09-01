import {IFunctionalToken, TokenTypes} from "../Token";

export default class Division implements IFunctionalToken {
    public get id() {
        return "Division"
    };

    public get type() {
        return TokenTypes.Operation
    };

    public test = ["/"];
    public priority = 2;

    public get argLength() {
        return 2;
    }

    public value = (args: Array<number>) => {
        if (args.length !== 2) {
            throw new RangeError(this.id + " operation expect two arguments")
        }
        return args[1] / args[0];
    }
}