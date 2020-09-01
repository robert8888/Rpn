"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PreFormatter {
    get id() {
        return "PreFormatter";
    }
    run(input) {
        return input.toLowerCase();
    }
}
exports.default = PreFormatter;
