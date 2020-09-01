
export interface IPosition {
    start: number,
    end: number,
    shift: number
    readonly original: number,
}

export default class Position implements IPosition{
    public shift = 0;

    constructor(public start: number, public end: number) {}

    public get original(){
        return this.start - this.shift;
    }
}