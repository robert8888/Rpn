"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Traceable = void 0;
class Traceable {
    constructor() {
        this.id = this.constructor.name;
    }
}
exports.Traceable = Traceable;
