"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Processor {
    constructor() {
        this.processes = new Map();
        this._race = Array();
        this._partials = Array();
    }
    get race() { return this._race; }
    ;
    get partial() { return this._partials; }
    ;
    use(extension, getPosition) {
        if (typeof extension === "function") {
            extension(this);
            return this;
        }
        const process = extension;
        if (getPosition) {
            const position = getPosition(this._race);
            this._race.splice(position, 0, process.id);
        }
        this._race.push(process.id);
        this.processes.set(process.id, process);
        const that = this;
        Object.assign(this, {
            get [process.id]() {
                return that.processes.get(process.id);
            },
        });
        return this;
    }
    exclude(processId) {
        this._race = this._race.filter(id => id !== processId);
        this.processes.delete(processId);
    }
    extend(processId, transform) {
        const process = this.processes.get(processId);
        if (!process) {
            throw new RangeError(`Processor error. Process of given id: ${processId} don't exist in current configuration`);
        }
        const transformed = transform(process);
        if (transformed.id !== process.id) {
            throw new Error(`Id of process has to stay the same`);
        }
        this.processes.set(processId, transformed);
    }
    compute(input) {
        this.partials = new Array();
        let current = input;
        for (let processId of this._race) {
            const process = this.processes.get(processId);
            if (!process)
                break;
            const output = process.run(current);
            this._partials.push(output);
            current = output;
        }
        return current;
    }
}
exports.default = Processor;
