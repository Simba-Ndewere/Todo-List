import "./index.css";
import Todo from "./todo";
import Dom from "./dom";

//create todos, 
//edit todos,
//mark to do as finished
//save to local storage
//view todo's
//validate form submission

const dom = new Dom();
const todo1 = new Todo("odin project", "entire course", "2024-12-01", "high", "default", false);
console.log(todo1);
dom.createTodo(todo1);

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
        const createdTodo = new Todo(data.get("todo"), data.get("description"), data.get("date"), priority, data.get("project-folder"), false);
        console.log(createdTodo);
        dom.createTodo(createdTodo);
        form.reset();
        modal.classList.remove("showModal");
        removeUnclickable();
    }
});

projectForm.addEventListener('submit', e => {
    e.preventDefault();
    let data = new FormData(e.target);
    dom.createProject(data.get("project-name"));
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


