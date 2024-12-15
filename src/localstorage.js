const todosArray = [];
const projectsArray = [];

class Storage {

    static saveTodo = (todo) => {
        let todoKey = "todo-" + todo.id;
        localStorage.setItem(todoKey, JSON.stringify(todo));
    }

    static saveProject = (project) => {
        let projectKey = "project-" + project.id;
        localStorage.setItem(projectKey, JSON.stringify(project));
    }

    static loadLocalStorage = () => {
        for (let a = 0; a < localStorage.length; a++) {
            const convertedObject = JSON.parse(localStorage.getItem(localStorage.key(a)));
            if (localStorage.key(a).startsWith("todo")) {
                todosArray.push(convertedObject);
            } else {
                projectsArray.push(convertedObject);
            }
        }
        Storage.sortById(todosArray);
        Storage.sortById(projectsArray);
    }

    static getSortedTodoArray = () => {
        return todosArray;
    }

    static getSortedProjectsArray = () => {
        return projectsArray;
    }

    static sortById = (arraySort) => {
        arraySort.sort((a, b) => b._id - a._id);
    }
}

export default Storage;