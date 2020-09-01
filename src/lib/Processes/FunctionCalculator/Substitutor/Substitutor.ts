import {IProcess, Traceable} from "../../../Process/Process";
import {IExpression, isExpression} from "../../../Expression/Expression";
import {data} from "../../../Processor/Processor";
import {TokenTypes} from "../../Parser/tokens/Token";
import {IVariableToken} from "../../Parser/tokens/special/Variable";

type Values = {[key:string] : number | null}

export default class Substitutor extends Traceable implements IProcess {
    private _values = <Values>{};

    run(input: data){
        if(isExpression(input)){
            return this.substitute(input);
        }
        return input;
    }

    substitute(input: IExpression){
        for(let token of input.tokens){
            if(token.type === TokenTypes.Variable){
                const current = <IVariableToken>token;
                current.value = this._values[current.name];
            }
        }
        return input;
    }

    set values(args: Values){
        this._values = args;
    }

    clear(){
        if(!this._values) return;
        for(let key in this._values){
            this._values[key] = null;
        }
    }
}
