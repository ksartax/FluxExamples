export default class Store {
    constructor(dispatcher) {
        this.__listeners = [];
        this.__state = this.getInitialState();
        dispatcher.register(this.__onDispatch.bind(this));
    }
    __onDispatch() {
        
    }
    getInitialState() {

    }
    addListener(listener) {
        this.__listeners.push(listener);
    }
    __emitChange() {
        this.__listeners.forEach(listener => listener(this.__state))
    }
}