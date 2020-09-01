import {IProcessor} from "../../Processor/Processor";
import NumeralsToDigit from "./NumeralsToDigit/NumeralsToDigit";
import en from "./dictionaries/en";

export default function Language(dictionary: {[key:string]: string | RegExp}){
    return (processor: IProcessor) => {
        processor.use(new NumeralsToDigit(dictionary), () => 0)
    }
}

export function LanguageEn(){
    return Language(en)
}