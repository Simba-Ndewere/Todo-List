import Todo from "./todo";
import Project from "./project";

const todosArray = [];
const projectsArray = [];

const todo1 = new Todo(0, "todo list", "Todo-list application javascript", "2024-12-25",
    "low", "javascript", true);
todosArray.push(todo1);

const todo2 = new Todo(1, "weather app", "Weather application javascript", "2025-01-15",
    "high", "javascript", false);
todosArray.push(todo2);

const todo3 = new Todo(3, "shopping cart", "shopping cart javascript", "2025-03-01",
    "medium", "react", false);
todosArray.push(todo3);

const proj1 = new Project(0, "react");
projectsArray.push(proj1);

const proj2 = new Project(1, "javascript");
projectsArray.push(proj2);

class Storage {

    static saveTodo = (todo) => {
        let todoKey = "todo-" + todo._id;
        if(todo._id > 3){
            localStorage.setItem(todoKey, JSON.stringify(todo));
        }
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

    static deleteTodo = (todo) => {
        localStorage.removeItem("todo-" + todo._id);
    }

    static deleteTodoById = (todoId) => {
        localStorage.removeItem("todo-" + todoId);
    }

    static deleteProject = (project) => {
        localStorage.removeItem("project-" + project._id);
    }

    static deleteProjectById = (projectId) => {
        localStorage.removeItem("project-" + projectId);
    }

    static getSortedTodoArray = () => {
        return todosArray;
    }

    static getSortedProjectsArray = () => {
        return projectsArray;
    }

    static sortById = (arraySort) => {
        arraySort.sort((a, b) => a._id - b._id);
    }
}

export default Storage;