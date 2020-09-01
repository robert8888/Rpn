import {IPosition, IToken} from "../Token";

export default class Idle implements IToken {
    constructor(public position: IPosition, public value: string) {
    }
}
