export default class Store {
    constructor(dispatcher){
        this.__listeners = [];
        this.__state = this.getInitialState();
        dispatcher.register(this.__onDispatch.bind(this));
    }
    getInitialState(){
        throw new Error("Metoda wymaga nadpisania");
    }
    __onDispatch(){
        throw new Error("Metoda wymaga nadpisania");
    }
    addListener(listener){
        this.__listeners.push(listener);
    }
    __emitChange(){
        this.__listeners.forEach(listener=>listener(this.__state));
    }
}