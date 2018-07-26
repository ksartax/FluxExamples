import ReduceStore from './store/ReduceStore';
import {generate as id} from 'shortid';
import {CREATE_TASK, COMPLETE_TASK, SHOW_TASKS} from './actions/taskActions';

export default class TasksStore extends ReduceStore {
    getInitialState() {
        return {
            tasks: [
                {id: id(), content: "Test1", complete: false},
                {id: id(), content: "Test2", complete: false},
                {id: id(), content: "Test3", complete: false},
                {id: id(), content: "Test4", complete: false},
                {id: id(), content: "Test5", complete: true},
            ],
            showComplete: true
        }
    }
    reduce(state, action) {
        let newState;
        switch(action.type) {
            case CREATE_TASK:
                newState = { ...state, tasks: [ ...state.tasks ]};
                newState.tasks.push({
                    id: id(),
                    content: action.value,
                    complete: false
                })

                return newState;
            case COMPLETE_TASK:
                newState = { ...state };
                const affectedElementIndex = newState.tasks.findIndex(t=>t.id === action.id);
                newState.tasks[affectedElementIndex].complete = action.value;

                return newState;
            case SHOW_TASKS:
                newState = { ... state, showComplete: action.value };

                return newState;
        }
        
        return state;
    }
    getState() {
        return this.__state;
    }
}