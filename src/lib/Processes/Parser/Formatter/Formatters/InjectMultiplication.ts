import {IProcess, Traceable} from "../../../../Process/Process";
import {Token, TokenTypes} from "../../tokens/Token";
import {IExpression} from "../../../../Expression/Expression";
import {data} from "../../../../Processor/Processor";
import {BracketVariant, IBracketToken} from "../../tokens/special/Bracket";
import Multiplication from "../../tokens/operations/Multiplication";
import {ExpressionBuilder} from "../../../../Expression/ExpressionBuilder";


export default class InjectMultiplication extends Traceable implements IProcess {
    public run(input: data) {
        input = <IExpression>input;
        return InjectMultiplication.injectMultiplication(input);
    }


    private static injectMultiplication(input: IExpression) {
        let occurrence = InjectMultiplication.findPattern(input.tokens);
        if(!occurrence.length) return input;

        let output = input;
        const multiplication = new Multiplication();
        for(let place of occurrence){
            output = ExpressionBuilder.injectToken(output, multiplication, "*", place)
        }

        return output;
    }

    private static findPattern(tokens: Token[]) {
        const positions = new Array<number>();
        for(let i = 0; i < tokens.length - 1; i++){
            let current = tokens[i];
            let next = tokens[i+1];

            const bracketByBracket =
                current.type === TokenTypes.Bracket && (<IBracketToken>current).variant === BracketVariant.Close
             && next.type === TokenTypes.Bracket && (<IBracketToken>next).variant === BracketVariant.Open;

            const bracketByFunction =
                current.type === TokenTypes.Bracket && (<IBracketToken>current).variant === BracketVariant.Close
                && next.type === TokenTypes.Function

            const numberByBracket =
                [TokenTypes.Number, TokenTypes.Variable].includes(current.type)
             && next.type === TokenTypes.Bracket && (<IBracketToken>next).variant === BracketVariant.Open;

            const bracketByNumber =
                current.type === TokenTypes.Bracket && (<IBracketToken>current).variant === BracketVariant.Close
             && [TokenTypes.Number, TokenTypes.Variable].includes(next.type)

            const numberByVariable =
                current.type === TokenTypes.Variable && [TokenTypes.Number, TokenTypes.Variable].includes(next.type);

            const variableByNumber =
                next.type === TokenTypes.Variable && [TokenTypes.Number, TokenTypes.Variable].includes(current.type);

            const numberByFunction =
                [TokenTypes.Number, TokenTypes.Variable].includes(current.type) && next.type === TokenTypes.Function;

            const numberByNumber =
                [TokenTypes.Number, TokenTypes.Variable].includes(current.type)
                && [TokenTypes.Number, TokenTypes.Variable].includes(next.type)

            const test =
                bracketByBracket || bracketByFunction || numberByBracket || bracketByNumber ||
                numberByVariable || variableByNumber || numberByFunction || numberByNumber

            if(test){
                positions.push(i + 1 + positions.length);
            }
        }
        return positions;
    }
}