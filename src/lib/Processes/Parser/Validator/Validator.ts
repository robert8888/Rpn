import Processor, {data} from "../../../Processor/Processor";
import {IProcess} from "../../../Process/Process";
import BracketMismatch from "./Validators/BracketMismatch";
import EmptyBrackets from "./Validators/EmptyBrackets";
import FunctionBrackets from "./Validators/FunctionBrackets";
import FunctionArguments from "./Validators/FunctionArguments";
import ComaPosition from "./Validators/ComaPosition";
import ComparisonLimit from "./Validators/ComparisonLimit";
import {ExpressionError} from "../../../Expression/Expression";

export class ValidationError extends ExpressionError {};

export default class Validator extends Processor implements IProcess{
    public id = this.constructor.name;

    constructor() {
        super();
        this.use(new BracketMismatch());
        this.use(new FunctionArguments());
        this.use(new EmptyBrackets());
        this.use(new FunctionBrackets());
        this.use(new ComaPosition());
        this.use(new ComparisonLimit())
    }

    public run(input: data){
        return this.compute(input);
    }
}