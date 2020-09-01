import TokenizersFactory from "./Tokenizer/TokenizersFactory";
import Tokenizer from "./Tokenizer/Tokenizer";
import {IProcess, Processor} from "../../../index";


export default class NumeralsToDigit extends Processor implements IProcess{
    public get id(){return this.constructor.name};

    constructor(dictionary: {[key: string]: string | RegExp}) {
        super();
        TokenizersFactory.dictionary = dictionary;
        this.use(new Tokenizer());
    }

    compute(input: string){
        return input;
    }

    run(input: string){
        return this.compute(input)
    }
}