export default class Stack<T> extends Array<T> {
    get top(){
        return this[this.length -1];
    }
    get isEmpty(){
        return !this.length;
    }
}