import {IProcess} from "../../../Process/Process";
import Processor , {data} from "../../../Processor/Processor";
import ReduceDuplicatedOperations from "./Formatters/ReduceDuplicated";
import ReduceSpacer from "./Formatters/RemoveSpacers";
import InjectMultiplication from "./Formatters/InjectMultiplication";
import RemoveStartOperation from "./Formatters/RemoveStartOperation";
import InjectMultiplicationByNegation from "./Formatters/InjectMultiplicationByNegation";
import AbsolutDelimiters from "./Formatters/AbsolutDelimiters";

export default class Formatter extends Processor implements IProcess{
    public id  =  this.constructor.name;

    constructor() {
        super();
        this.use(new ReduceSpacer());
        this.use(new AbsolutDelimiters())
        this.use(new InjectMultiplication());
        this.use(new ReduceDuplicatedOperations());
        this.use(new InjectMultiplicationByNegation());
        this.use(new RemoveStartOperation());
    }

    public run(input: data){
        return this.compute(input);
    }
}