import {IProcess, Traceable} from "../../../../Process/Process";
import {IExpression} from "../../../../Expression/Expression";
import {data} from "../../../../Processor/Processor";
import Absolute, {isAbsoluteDelimiter} from "../../tokens/functions/Abs";
import {ExpressionBuilder} from "../../../../Expression/ExpressionBuilder";
import {BracketVariant} from "../../tokens/special/Bracket";
import BracketToken from "../../tokens/special/Bracket";

export default class AbsolutDelimiters extends Traceable implements IProcess {
    public run(input: data) {
        input = <IExpression>input;
        return this.replaceDelimiters(input);
    }

    private replaceDelimiters(input: IExpression) {
        const tokens = input.tokens;
        let isOpened = false;
        for(let i = 0 ; i < tokens.length; i++) {
            const current = tokens[i]
            if (!isAbsoluteDelimiter(current)) continue;

            if(!isOpened){
                input = this.injectAbsoluteStart(input, i);
                isOpened = true;
                i++;
            } else {
                input =  this.injectAbsoluteEnd(input, i)
                isOpened = false;
            }
        }

        return input;
    }

    private injectAbsoluteStart(input: IExpression, place: number): IExpression{
        let output = ExpressionBuilder.removeToken(input, place);

        const bracket = new BracketToken("Round", BracketVariant.Open, "(");
        output = ExpressionBuilder.injectToken(output, bracket,"(",  place);

        const absoluteToken = new Absolute();
        output = ExpressionBuilder.injectToken(output, absoluteToken,"abs",  place);

        return output;
    }

    private injectAbsoluteEnd(input:IExpression, place: number): IExpression{
        const bracket = new BracketToken("Round", BracketVariant.Close, ")")
        let output  = ExpressionBuilder.injectToken(input, bracket,")",  place);
        return ExpressionBuilder.removeToken(output, place + 1)
    }

}