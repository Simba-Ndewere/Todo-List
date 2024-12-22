import "./index.css";
import Todo from "./todo";
import Dom from "./dom";
import Project from "./project";
import Storage from "./localstorage";

const modal = document.querySelector(".modal-container");
const addToDo = document.querySelector(".signCreate");
const form = document.querySelector(".modal-container");
const projectForm = document.querySelector(".project-container");
const close = document.querySelector(".close");
const projectClose = document.querySelector(".closeProject");
const addProject = document.querySelector(".projectCreate");
const addProjectMobileNav = document.querySelector(".projectCreateNav");
const navMobile = document.querySelector(".nav-icon");
const closebtn = document.querySelector(".closebtn");
const modalTitle = document.querySelector(".modal-title");
const bottom = document.querySelector(".bottom");
const modalButton = document.querySelector(".btnSubmit");
const error = document.querySelector(".error");
const deleteButton = document.querySelector(".deleteButton");
const projects = document.querySelectorAll(".projects");
const allTodos = document.querySelectorAll(".all");
const bottomName = document.querySelector(".project-name-bottom");

const todoArray = Storage.getSortedTodoArray();
const projectArray = Storage.getSortedProjectsArray();

let todoIdGlobal = 0;

const loadStorage = () => {
    Storage.loadLocalStorage();
    console.log(todoArray);
    for (let a = 0; a < todoArray.length; a++) {
        const todoObject = todoArray[a];
        const todo = new Todo(todoObject._id, todoObject._title, todoObject._description, todoObject._dueDate,
            todoObject._priority, todoObject._project, todoObject._completed);

        Dom.createTodo(todo);
        if (todo.completed) {
            Dom.todoCheckbox(todo);
        }
    }

    for (let a = 0; a < projectArray.length; a++) {
        const projectObject = projectArray[a];
        const project = new Project(projectObject._id, projectObject._name);
        Dom.createProject(project);
        Dom.addProjectToDropDown(project);
    }
}

window.onload = loadStorage;

addToDo.addEventListener('click', function () {
    modal.classList.add("showModal");
    modalTitle.textContent = "CREATE TODO";
    modalButton.textContent = "SUBMIT";
    deleteButton.classList.add("hide");
    Dom.addUnclickable();
});

addProject.addEventListener('click', function () {
    console.log(localStorage);
    projectForm.classList.add("showModal");
    Dom.addUnclickable();
});

close.addEventListener('click', function () {
    form.reset();
    modal.classList.remove("showModal");
    Dom.removeUnclickable();
});

projectClose.addEventListener('click', function () {
    projectForm.reset();
    projectForm.classList.remove("showModal");
    Dom.removeUnclickable();
});

addProjectMobileNav.addEventListener('click', function () {
    document.querySelector(".sidenav").style.width = "0";
    projectForm.classList.add("showModal");
    Dom.addUnclickable();
});

form.addEventListener('submit', e => {
    e.preventDefault();
    let checked = false;
    let priority = "";
    for (let a = 1; a < 4; a++) {
        const radioButton = document.getElementById("dot-" + a);
        if (radioButton.checked) {
            checked = true;
            if (a == 1)
                priority = "low";

            if (a == 2)
                priority = "medium";

            if (a == 3)
                priority = "high";
            break;
        }
    }

    if (!checked) {
        error.innerText = "please enter priority"
    } else {
        createOrUpdate(e, priority);
    }
});

const createOrUpdate = (e, priority) => {
    if (modalButton.textContent == 'SUBMIT') {
        error.innerText = "";
        let data = new FormData(e.target);
        let todoIdentification = 0;
        if (todoArray.length!=0) {
            todoIdentification = todoArray[0]._id + 1;
        }
        const createdTodo = new Todo(todoIdentification, data.get("todo"), data.get("description"), data.get("date"), priority, data.get("project-folder"), false);
        Storage.saveTodo(createdTodo);
        Dom.createTodo(createdTodo);
        todoArray.push(createdTodo);
        console.log("object pushed at the end" + createdTodo);
        form.reset();
        modal.classList.remove("showModal");
        Dom.removeUnclickable();
    } else {
        error.innerText = "";
        let data = new FormData(e.target);
        const updatedTodo = new Todo(todoIdGlobal, data.get("todo"), data.get("description"), data.get("date"), priority, data.get("project-folder"), false);
        Dom.updateToDoContainer(updatedTodo);
        Storage.deleteTodo(updatedTodo);
        Storage.saveTodo(updatedTodo);

        for (let a = 0; a < todoArray.length; a++) {
            if (todoArray[a]._id == updatedTodo.id) {
                todoArray[a]._title = updatedTodo.title;
                todoArray[a]._description = updatedTodo.description;
                todoArray[a]._dueDate = updatedTodo.dueDate;
                todoArray[a]._priority = priority;
                todoArray[a]._project = updatedTodo.project;
                todoArray[a]._completed = updatedTodo.completed;
                break;
            }
        }

        form.reset();
        modal.classList.remove("showModal");
        Dom.removeUnclickable();
    }
}

projectForm.addEventListener('submit', e => {
    e.preventDefault();
    let data = new FormData(e.target);
    let keyCount = localStorage.length;
    const createdProject = new Project(keyCount + 1, data.get("project-name"));
    Storage.saveProject(createdProject);
    Dom.createProject(createdProject);
    projectForm.reset();
    projectForm.classList.remove("showModal");
    Dom.removeUnclickable();

    Dom.addProjectToDropDown(createdProject);
});

navMobile.addEventListener('click', function () {
    document.querySelector(".sidenav").style.width = "250px";
    Dom.addUnclickable();
});

closebtn.addEventListener('click', function () {
    document.querySelector(".sidenav").style.width = "0";
    Dom.removeUnclickable();
});

bottom.addEventListener("click", (event) => {
    if (event.target.classList.contains("openImg")) {
        Dom.addUnclickable();
        let todoId = Number(event.target.id.substring(1));
        for (let a = 0; a < todoArray.length; a++) {
            if (todoArray[a]._id == todoId) {
                todoIdGlobal = todoId;
                Dom.editModal(todoArray[a]);
                break;
            }
        }
    }
});

bottom.addEventListener("click", (event) => {
    if (event.target.classList.contains("todo-checkbox")) {
        const todoId = Number(event.target.id.substring(1));
        for (let a = 0; a < todoArray.length; a++) {
            if (todoArray[a]._id == todoId) {
                Dom.completeTodo(todoArray[a], event);
                break;
            }
        }
    }
});

deleteButton.addEventListener("click", () => {
    Dom.deleteTodoContainer(todoIdGlobal);
    for (let a = 0; a < todoArray.length; a++) {
        if (todoArray[a]._id == todoIdGlobal) {
            todoArray.splice(a, 1);
            break;
        }
    }
    form.reset();
    modal.classList.remove("showModal");
    Dom.removeUnclickable();
});

for (let a = 0; a < projects.length; a++) {
    projects[a].addEventListener("click", (event) => {
        if (event.target.classList.contains("projectClick")) {
            const project = event.target.textContent.substring(2);
            Dom.clearBottomDom(todoArray);
            bottomName.textContent = project.toUpperCase();
            populateBottomByProject(project);
        }
    });
}

for (let a = 0; a < allTodos.length; a++) {
    allTodos[a].addEventListener("click", () => {
        bottomName.textContent = "ALL TODO's";
        Dom.clearBottomDom(todoArray);
        for (let a = 0; a < todoArray.length; a++) {
            const todoObject = todoArray[a];
            const todo = new Todo(todoObject._id, todoObject._title, todoObject._description, todoObject._dueDate,
                todoObject._priority, todoObject._project, todoObject._completed);

            Dom.createTodo(todo);
            if (todo.completed) {
                Dom.todoCheckbox(todo);
            }
        }
    });
}

const populateBottomByProject = (projectName) => {
    for (let a = 0; a < todoArray.length; a++) {
        if (todoArray[a]._project.toUpperCase() == projectName.toUpperCase()) {
            const todoObject = todoArray[a];
            const todo = new Todo(todoObject._id, todoObject._title, todoObject._description, todoObject._dueDate,
                todoObject._priority, todoObject._project, todoObject._completed);
            Dom.createTodo(todo);
            if (todo.completed) {
                Dom.todoCheckbox(todo);
            }
        }
    }
}

window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        document.querySelector(".sidenav").style.width = "0";
    }
});




