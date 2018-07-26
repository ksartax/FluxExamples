export const CREATE_TASK = `CREATE_TASK`;
export const COMPLETE_TASK = `COMPLETE_TASK`;
export const SHOW_TASKS = `SHOW_TASKS`;

export const createNewTaskAction = (content) => {
    return {
        type: CREATE_TASK,
        value: content
    }
}

export const completeTaskAction = (id, isComplete) => {
    return {
        type: COMPLETE_TASK,
        id,
        value: isComplete
    }
}

export const showTasksAction = (show) => {
    return {
        type: SHOW_TASKS,
        value: show
    }
}