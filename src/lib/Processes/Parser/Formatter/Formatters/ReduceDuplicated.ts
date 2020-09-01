import {IProcess, Traceable} from "../../../../Process/Process";
import {Token, TokenTypes} from "../../tokens/Token";
import {IExpression} from "../../../../Expression/Expression";
import {data} from "../../../../Processor/Processor";

export default class ReduceDuplicated extends Traceable implements IProcess {
    public run(input: data) {
        input = <IExpression>input;
        return ReduceDuplicated.reduceDuplicated(input);
    }

    private static reduceDuplicated(input: IExpression) {
        const tokens = new Array<Token>();

        input.tokens.forEach((token, index) => {
            if(index === input.tokens.length - 1){
              tokens.push(token);
              return;
            }
            const current = input.tokens[index];
            const next = input.tokens[index +  1];

            const types = [TokenTypes.Operation, TokenTypes.Separator]

            const test = types.includes(current.type) && types.includes(next.type) && current.id === next.id;

            if(test) return;
            tokens.push(token);
        })

        input.tokens = tokens;
        return input;
    }
}