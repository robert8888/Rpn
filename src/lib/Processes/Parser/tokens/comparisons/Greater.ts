import {IFunctionalToken, TokenTypes} from "../Token";

export default class Greater implements IFunctionalToken {
    public get id() {
        return "Greater"
    };

    public get type() {
        return TokenTypes.Comparison
    };

    public test = [/^>(?=[^=])/];
    public priority = 0;

    public get argLength() {
        return 2;
    }

    public value = (args: Array<number>) =>  {
        if (args.length !== 2) {
            throw new RangeError("Comparison operation expect two arguments")
        }
        return args[1] > args[0];
    }
}