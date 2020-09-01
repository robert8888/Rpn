"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deepCopy(inObject) {
    let outObject, value;
    if (typeof inObject !== "object" || inObject === null) {
        return inObject;
    }
    outObject = Array.isArray(inObject) ? [] : {};
    function copy(descriptor, key) {
        value = descriptor.value;
        if (typeof value === "function") {
            Object.defineProperty(outObject, key, descriptor);
        }
        else {
            const _value = deepCopy(value);
            const _descriptor = Object.assign({}, descriptor);
            _descriptor.value = _value;
            Object.defineProperty(outObject, key, descriptor);
        }
    }
    for (let key in Object.getOwnPropertyDescriptors(inObject)) {
        const descriptor = Object.getOwnPropertyDescriptor(inObject, key);
        copy(descriptor, key);
    }
    for (let key in Object.getOwnPropertyDescriptors(Object.getPrototypeOf(inObject))) {
        const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(inObject), key);
        copy(descriptor, key);
    }
    return outObject;
}
exports.default = deepCopy;
