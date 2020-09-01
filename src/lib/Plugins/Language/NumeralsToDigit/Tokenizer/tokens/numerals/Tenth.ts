import Numeral from "./Numeral";

export default class Tenth extends Numeral {
    static construct = Tenth;

    static dictionary = {
        0.1: {
            pattern: "",
            value: 0.1
        }
    }
}