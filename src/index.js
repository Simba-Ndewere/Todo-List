import "./index.css";
import Todo from "./todo";
import Dom from "./dom";
import Project from "./project";
import Storage from "./localstorage";

//edit todos,
//mark to do as finished
//view todo's

const todo1 = new Todo(0, "odin project", "entire course", "2024-12-01", "high", "default", false);
Dom.createTodo(todo1);

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

const loadStorage = () => {
    Storage.loadLocalStorage();
    const todoArray = Storage.getSortedTodoArray();
    const projectArray = Storage.getSortedProjectsArray();

    for (let a = 0; a < todoArray.length; a++) {
        const todoObject = todoArray[a];
        const todo = new Todo(todoObject._id, todoObject._title, todoObject._description, todoObject._dueDate, 
            todoObject._priority, todoObject._project, todoObject);
        Dom.createTodo(todo);
    }

    for (let a = 0; a < projectArray.length; a++) {
        const projectObject = projectArray[a];
        const project = new Project(projectObject._id , projectObject._name);
        Dom.createProject(project);
    }
}

window.onload = loadStorage;

addToDo.addEventListener('click', function () {
    modal.classList.add("showModal");
    addUnclickable();
});

addProject.addEventListener('click', function () {
    projectForm.classList.add("showModal");
    addUnclickable();
});

close.addEventListener('click', function () {
    form.reset();
    modal.classList.remove("showModal");
    removeUnclickable();
});

projectClose.addEventListener('click', function () {
    projectForm.reset();
    projectForm.classList.remove("showModal");
    removeUnclickable();
});

addProjectMobileNav.addEventListener('click', function () {
    document.querySelector(".sidenav").style.width = "0";
    projectForm.classList.add("showModal");
    addUnclickable();
});

form.addEventListener('submit', e => {
    const error = document.querySelector(".error");
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
        error.innerText = "";
        let data = new FormData(e.target);
        let keyCount = localStorage.length;
        const createdTodo = new Todo(keyCount + 1, data.get("todo"), data.get("description"), data.get("date"), priority, data.get("project-folder"), false);
        Storage.saveTodo(createdTodo);
        Dom.createTodo(createdTodo);
        form.reset();
        modal.classList.remove("showModal");
        removeUnclickable();
    }
});

projectForm.addEventListener('submit', e => {
    e.preventDefault();
    let data = new FormData(e.target);
    let keyCount = localStorage.length;
    const createdProject = new Project(keyCount + 1, data.get("project-name"));
    Storage.saveProject(createdProject);
    Dom.createProject(createdProject.name);
    projectForm.reset();
    projectForm.classList.remove("showModal");
    removeUnclickable();
});

navMobile.addEventListener('click', function () {
    document.querySelector(".sidenav").style.width = "350px";
});

closebtn.addEventListener('click', function () {
    document.querySelector(".sidenav").style.width = "0";
});

const addUnclickable = () => {
    addToDo.classList.add("unclickable");
    addProject.classList.add("unclickable");
    navMobile.classList.add("unclickable");
}

const removeUnclickable = () => {
    addToDo.classList.remove("unclickable");
    addProject.classList.remove("unclickable");
    navMobile.classList.remove("unclickable");
}

window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        document.querySelector(".sidenav").style.width = "0";
    }
});


