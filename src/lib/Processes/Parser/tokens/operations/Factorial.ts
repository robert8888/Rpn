import {IFunctionalToken, TokenTypes} from "../Token";

export default class Factorial implements IFunctionalToken {
    public get id() {
        return "Factorial"
    };

    public get type() {
        return TokenTypes.Operation
    };

    public test = ["!"];
    public priority = 3;

    public get argLength() {
        return 1;
    }

    public value = (args: Array<number>) => {
        if (args.length !== 1) {
            throw new RangeError(this.id + " operation expected exactly one argument")
        }
        let n = args[0];
        let result = 1;
        if (Math.floor(n) != n) {
            throw new RangeError('Attempt to calculate factorial from not integer number ' + n );
        } else if (n <= 0) {
            throw new RangeError('Attempt to calculate factorial from not positive number (' + n + ')')
        } else {
            for(let i = n; i > 0 ; i--){
                result *= i;
            }
        }
        return result;
    }
}