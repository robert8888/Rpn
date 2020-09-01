import {Token} from "../Token";

export default class Space extends Token {
    static construct = Space;

    static dictionary = {
        space: {
            pattern: /^\s+/,
            value: " ",
        },
    }
}