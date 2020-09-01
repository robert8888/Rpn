import {Token} from "./Token";
import BracketToken, {BracketVariant} from "./special/Bracket";
import VariableToken from "./special/Variable";
import ConstantToken from "./special/Constant";
import NumberToken from "./special/Number";
import Division from "./operations/Division";
import Multiplication from "./operations/Multiplication";
import Summation from "./operations/Summation";
import Subtraction from "./operations/Subtraction";
import Square from "./operations/Square";
import Factorial from "./operations/Factorial";
import Equality from "./comparisons/Equality";
import Less from "./comparisons/Less";
import Greater from "./comparisons/Greater";
import LessOrEqual from "./comparisons/LessOrEqual";
import GreaterOrEqual from "./comparisons/GreaterOrEqual";
import Cosine from "./functions/Cosine";
import Cotangent from "./functions/Cotangent";
import Power from "./functions/Power";
import Logarithm from "./functions/Logarithm";
import NaturalLogarithm from "./functions/NaturalLogarithm";
import Root from "./functions/Root";
import Sine from "./functions/Sine";
import SquareRoot from "./functions/SquareRoot";
import Tangent from "./functions/Tanget";
import Coma from "./special/Coma";
import Space from "./special/Space";
import Absolute from "./functions/Abs";

export default class TokenFactory {
    produce(){
        const tokens = new Array<Token>();
        tokens.push(...this.function());
        tokens.push(...this.comparison());
        tokens.push(...this.special());
        tokens.push(...this.operations());
        return tokens;
    }

    private special(){
        return [
            new ConstantToken("Constant_Pi", Math.PI, ["pi"]),
            new ConstantToken("Constant_E", Math.E, ["e"]),
            new ConstantToken("Constant_Deg", Math.PI / 180, ['deg']),

            new BracketToken("Round", BracketVariant.Open, "("),
            new BracketToken("Round", BracketVariant.Close, ")"),
            new BracketToken("Square", BracketVariant.Open, "["),
            new BracketToken("Square", BracketVariant.Close, "]"),

            new Coma(),
            new Space(),

            new NumberToken(),
            new VariableToken(),
        ]
    }

    private operations(){
        return [
            new Division(),
            new Multiplication(),
            new Summation(),
            new Subtraction(),
            new Square(),
            new Factorial(),
        ]
    }

    private comparison(){
        return [
            new Equality(),
            new Less(),
            new Greater(),
            new LessOrEqual(),
            new GreaterOrEqual(),
        ]
    }

    private function(){
        return [
            new Cosine(),
            new Cotangent(),
            new Logarithm(),
            new NaturalLogarithm(),
            new Power(),
            new Root(),
            new Sine(),
            new SquareRoot(),
            new Tangent(),
            new Absolute(),
        ]
    }
}