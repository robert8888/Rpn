import Numeral from "./Numeral";

export default class Thousand extends Numeral {
    static construct = Thousand;

    static dictionary = {
        1_000: {
            pattern: "",
            value: 1_000
        }
    }
}