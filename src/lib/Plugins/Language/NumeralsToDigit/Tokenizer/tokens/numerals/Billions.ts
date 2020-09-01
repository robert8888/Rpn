import Numeral from "./Numeral";

export default class Billions extends Numeral {
    static construct = Billions;

    static dictionary = {
        1_000_000_000: {
            pattern: "",
            value: 1_000_000_000
        }
    }
}