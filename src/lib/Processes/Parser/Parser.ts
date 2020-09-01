import {IProcess, ITraceable} from "../../Process/Process";
import {data} from "../../Processor/Processor";
import Processor from "../../Processor/Processor";
import Tokenizer from "./Tokenizer";
import PreFormatter from "./PreFormatter";
import Formatter from "./Formatter/Formatter";
import Validator from "./Validator/Validator";


export default class Parser extends Processor implements IProcess, ITraceable{
    public id  =  this.constructor.name;

    constructor() {
        super();
        this.use(new PreFormatter());
        this.use(new Tokenizer());
        this.use(new Formatter());
        this.use(new Validator())
    }

    public run(input: data){
        return this.compute(input);
    }
}