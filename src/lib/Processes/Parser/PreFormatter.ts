import {IProcess} from "../../Process/Process";
import {data} from "../../Processor/Processor";

export default class PreFormatter implements IProcess{
    public get id(){
        return "PreFormatter";
    }
    run(input: data){
        return (<string>input).toLowerCase();
    }
}