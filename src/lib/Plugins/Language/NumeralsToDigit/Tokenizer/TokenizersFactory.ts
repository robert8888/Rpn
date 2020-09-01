import Units from "./tokens/numerals/Units";
import Dozens from "./tokens/numerals/Dozens";
import Tens from "./tokens/numerals/Tens";
import Hundreds from "./tokens/numerals/Hundreds";
import Hundredths from "./tokens/numerals/Hundredths";
import Thousand from "./tokens/numerals/Thousand";
import Millions from "./tokens/numerals/Milions";
import Billions from "./tokens/numerals/Billions";
import Space from "./tokens/Space";
import Tenth from "./tokens/numerals/Tenth";


export type Tokenizers =
    (
        typeof Tenth | typeof Hundredths |
        typeof Units |typeof Dozens |
        typeof Tens | typeof Hundreds |
        typeof Thousand |typeof Millions |
        typeof Billions | typeof Space

    )[];

export default class TokenizersFactory {
    public static dictionary : {[key:string]: string | RegExp}

    static tokenizers = [
        Hundredths,
        Tenth,
        Units,
        Dozens,
        Tens,
        Hundreds,
        Thousand,
        Millions,
        Billions,
        Space,
    ]

    constructor() {
        for(let tokenizer of TokenizersFactory.tokenizers){
            for(let key in tokenizer.dictionary){
                if(TokenizersFactory.dictionary.hasOwnProperty(key)){
                    // @ts-ignore
                    tokenizer.dictionary[key].pattern = TokenizersFactory.dictionary[key];
                }
            }
        }
    }

    public produce() : Tokenizers{
        return TokenizersFactory.tokenizers;
    }
}