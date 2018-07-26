import Dispatcher from './flux/dispatcher/Dispatcher';
import TasksStore from './flux/TasksStore';
import {createNewTaskAction, completeTaskAction, showTasksAction} from './flux/actions/taskActions';

const tasksDispatcher = new Dispatcher();
const tasksStore = new TasksStore(tasksDispatcher); 

const TaskComponent = ({content, complete, id})=>(
    `<section>
        ${content} <input type="checkbox" name="taskCompleteCheck" data-taskid="${id}" ${complete ? "checked" : ""}> 
    </section>`
)

const render = () => {
    const tasksSection = document.getElementById(`tasks`);
    const state = tasksStore.getState();
    const rendered = tasksStore.getState().tasks
        .filter(task=>state.showComplete ? true : !task.complete)
        .map(TaskComponent).join("");

    tasksSection.innerHTML = rendered;

    document.getElementsByName('taskCompleteCheck').forEach(element=>{
        element.addEventListener('change', (e) => {
            const id = e.target.attributes['data-taskid'].value;
            const checked= e.target.checked;
            tasksDispatcher.dispatch(completeTaskAction(id, checked));
        })
    });
}

document.forms.newTask.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name = e.target.newTaskName.value;
    if (name) {
        tasksDispatcher.dispatch(createNewTaskAction(name));
        e.target.newTaskName.value = null;
    }
})

document.forms.undo.addEventListener('submit', (e) => {
    e.preventDefault();
    tasksStore.revertLastState();
})

document.getElementById(`showComplete`).addEventListener('change',({target}) => {
    const showComplete = target.checked;
    tasksDispatcher.dispatch(showTasksAction(showComplete));
})

tasksDispatcher.dispatch("TEST_DISPATHER");

tasksStore.addListener(() => {
    render();
})

render();