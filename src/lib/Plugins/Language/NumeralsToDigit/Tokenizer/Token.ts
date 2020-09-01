export interface IPosition  {
    start: number;
    end: number;
}

export interface INumeral {
    value: number | string
}

export interface IToken extends INumeral{
    position: IPosition
}

export class Position implements IPosition{
    constructor(public start: number, public end: number) {}
}

export class Token implements IToken, INumeral{
    static construct = Token;
    public static dictionary = <{[key:string]: {pattern: string| RegExp, value: number | string}}>{}

    protected constructor(public position: IPosition, public value: number | string) {}

    public static test(input: string, dictionary: {[key:string]:{pattern: string | RegExp, value:number | string}})
        : {value: number | string, length: number} | null {
        for(let test of Object.values(dictionary)){
            if(!test.pattern) continue;
            if(test.pattern instanceof RegExp){
                const match = test.pattern.exec(input);
                if(match){
                    return {
                        value: test.value,
                        length: match[0].length
                    }
                }
            } else {
                if(input.startsWith(test.pattern)){
                    return {
                        value: test.value,
                        length: test.pattern.length,
                    }
                }
            }
        }
        return null;
    }

    public static get(input: string, offset: number): (IToken | undefined){
        const match = Token.test(input, this.dictionary);
        if(match){
            return new this.construct(new Position(offset, offset + match.length), match.value);
        }
    }
}