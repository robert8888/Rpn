import Numeral from "./Numeral";

export default class Hundredths extends Numeral {
    static construct = Hundredths;

    static dictionary = {
        0.01: {
            pattern: "",
            value: 0.01
        }
    }
}