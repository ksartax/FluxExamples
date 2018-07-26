import Store from './Store';

export default class ReduceStore extends Store {
    constructor(dispather) {
        super(dispather);
        this.__history = [];
    }
    reduce(state, action) {
        throw new Error("Musi zostac nadpisana");
    }
    __onDispatch(action) {
        const newState = this.reduce(this.__state, action);
        if (newState !== this.__state) {
            this.__history.push(this.__state);
            this.__state = newState;
            this.__emitChange();
        }
    }
    revertLastState(){
        if (this.__history.length > 0) {
            this.__state = this.__history.pop();
        }
        this.__emitChange();
    }
}