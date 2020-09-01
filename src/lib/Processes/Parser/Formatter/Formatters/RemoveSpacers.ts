import {IProcess, Traceable} from "../../../../Process/Process";
import {TokenTypes} from "../../tokens/Token";
import {IExpression} from "../../../../Expression/Expression";
import {data} from "../../../../Processor/Processor";

export default class ReduceSpacer extends Traceable implements IProcess {
    public run(input: data) {
        input = <IExpression>input;
        return ReduceSpacer.removeSpacers(input);
    }

    private static removeSpacers(input: IExpression) {
        const tokens = input.tokens.filter(token => token.type !== TokenTypes.Spacer);
        input.tokens = tokens;
        return input;
    }
}