class Storage {

    static saveTodo = (todo) => {
        let todoKey = "todo-" + todo.id;
        localStorage.setItem(todoKey, JSON.stringify(todo));
    }

    static retrieveTodos = (todoKey) => {
        if(localStorage.getItem(todoKey)){

        }
    }

    static saveProject = (project) => {
        let projectKey = "project-" + project.id;
        localStorage.setItem(projectKey, JSON.stringify(project));
    }

    static retrieveProjects = (projectKey) => {
        if(localStorage.getItem(projectKey)){

        }
    }
}

export default Storage;