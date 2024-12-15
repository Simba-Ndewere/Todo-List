import "./index.css";
import Todo from "./todo";
import Dom from "./dom";
import Project from "./project";
import Storage from "./localstorage";

//edit todos,
//mark to do as finished

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
const modalTitle = document.querySelector(".modal-title");
const bottom = document.querySelector(".bottom");

const todoArray = Storage.getSortedTodoArray();
const projectArray = Storage.getSortedProjectsArray();

const loadStorage = () => {
    Storage.loadLocalStorage();
    console.log(localStorage);
    for (let a = 0; a < todoArray.length; a++) {
        const todoObject = todoArray[a];
        const todo = new Todo(todoObject._id, todoObject._title, todoObject._description, todoObject._dueDate,
            todoObject._priority, todoObject._project, todoObject);
        Dom.createTodo(todo);
    }

    for (let a = 0; a < projectArray.length; a++) {
        const projectObject = projectArray[a];
        const project = new Project(projectObject._id, projectObject._name);
        Dom.createProject(project);
    }
    todoArray.push(todo1);
}

window.onload = loadStorage;

addToDo.addEventListener('click', function () {
    modal.classList.add("showModal");
    modalTitle.textContent = "CREATE TODO";
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
    Dom.createProject(createdProject);
    projectForm.reset();
    projectForm.classList.remove("showModal");
    removeUnclickable();

    Dom.addProjectToDropDown(createdProject);
});

navMobile.addEventListener('click', function () {
    document.querySelector(".sidenav").style.width = "350px";
});

closebtn.addEventListener('click', function () {
    document.querySelector(".sidenav").style.width = "0";
});

bottom.addEventListener("click", (event) => {
    if (event.target.classList.contains("openImg")) {
        modal.classList.add("showModal");
        modalTitle.textContent = "VIEW TODO";
        let todoId = Number(event.target.id.substring(1));
        for (let a = 0; a < todoArray.length; a++) {
            if (todoArray[a]._id == todoId) {
                const todoTitle = document.querySelector(".todo-title");
                const todoDescription = document.querySelector(".todo-description");
                const todoDate = document.querySelector(".todo-date");
                const todoProject = document.querySelector(".cars");
                
                if(todoArray[a]._priority=='low'){
                    const priorityView = document.getElementById("dot-1");
                    priorityView.checked = true;
                }

                if(todoArray[a]._priority=='medium'){
                    const priorityView = document.getElementById("dot-2");
                    priorityView.checked = true;
                }

                if(todoArray[a]._priority=='high'){
                    const priorityView = document.getElementById("dot-3");
                    priorityView.checked = true;
                }

                todoTitle.value = todoArray[a]._title;
                todoDescription.value = todoArray[a]._description;
                todoDate.value = todoArray[a]._dueDate;
                todoProject.value = todoArray[a]._project;
                
            }
        }
    }
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


