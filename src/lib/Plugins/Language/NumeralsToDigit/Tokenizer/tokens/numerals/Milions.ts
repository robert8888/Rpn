import Numeral from "./Numeral";

export default class Millions extends Numeral {
    static construct = Millions;

    static dictionary = {
        1_000_000: {
            pattern: "",
            value: 1_000_000
        }
    }
}