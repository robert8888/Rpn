import {Token} from "../Processes/Parser/tokens/Token";
import {Expression, ExpressionError, IExpression} from "./Expression";
import Position, {IPosition} from "../Processes/Parser/tokens/Position";
import {ValidationError} from "../Processes/Parser/Validator/Validator";
import DeepClone from "../Utils/DeepClone";

export interface IExpressionBuilder {
    push(token: Token, position?: IPosition, origin?: string): void
    pushError(error: ExpressionError | ValidationError): void;
    build(): IExpression;
}

export class ExpressionBuilder implements IExpressionBuilder {
    private expression = <IExpression>new Expression();

    public push(token: Token, position?: IPosition, origin?: string){
        const tokenClone = DeepClone(token);
        if(position){
            tokenClone.position = position;
        }
        if(origin){
            tokenClone.origin = origin;
        }
        this.expression.tokens.push(tokenClone)
    }

    public pushError(error: ExpressionError | ValidationError) {
        ExpressionBuilder.pushError(this.expression, error);
    }

    public getEndPositionOfLast(){
        const lastToken = this.expression.tokens[this.expression.details.length - 1];
        return lastToken?.position?.end || 0;
    }

    public build(){
        return this.expression;
    }

    public static pushError(expression: IExpression, error: ExpressionError){
        if(!expression.errors){
            expression.errors = new Array<ExpressionError>();
        }
        expression.errors.push(error)
        return expression;
    }

    public static injectToken(
        input: IExpression,
        token : Token,
        origin: string,
        place: number){

        token = DeepClone(token);

        token.position = new Position(
           input.tokens[place].position?.end || 0,
           origin.length + (input.tokens[place].position?.end || 0)
        )
        token.origin = origin;

        input.tokens.splice(place, 0, token)

        for(let i = place; i < input.tokens.length; i++){
            let token = input.tokens[i];
            if(!token.position) continue;
            token.position.start += origin.length;
            token.position.end += origin.length;
            token.position.shift += origin.length;
        }

        return input;
    }

    public static removeToken(input: IExpression, position: number){
        const length = input.tokens[position].origin?.length || 0;
        input.tokens.splice(position, 1);
        for(let i = position; i < input.tokens.length; i++){
            let token = input.tokens[i];
            if(!token.position) continue;
            token.position.start -= length;
            token.position.end -= length;
            token.position.shift -= length;
        }
        return input;
    }
}
