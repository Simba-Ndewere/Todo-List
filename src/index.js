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
const todo1 = new Todo("odin project", "entire course", "2024-12-01", "high", "default");
console.log(todo1);
dom.createTodo(todo1);

const modal = document.querySelector(".modal-container");
const addToDo = document.querySelector(".signCreate");
const form = document.querySelector(".modal-container");
const projectForm = document.querySelector(".project-container");
const close = document.querySelector(".close");
const projectClose = document.querySelector(".closeProject");
const addProject = document.querySelector(".projectCreate");

addToDo.addEventListener('click', function () {
    modal.classList.add("showModal");
});

addProject.addEventListener('click', function () {
    projectForm.classList.add("showModal");
});

close.addEventListener('click', function () {
    form.reset();
    modal.classList.remove("showModal");
});

projectClose.addEventListener('click', function () {
    projectForm.reset();
    projectForm.classList.remove("showModal");
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
            if(a==1)
                priority = "low";

            if(a==2)
                priority = "medium";

            if(a==3)
                priority = "high";
            break;
        }
    }

    if (!checked) {
        error.innerText = "please enter priority"
    } else {
        error.innerText = "";    
        let data = new FormData(e.target);
        const createdTodo = new Todo(data.get("todo"), data.get("description"), data.get("date"), priority);
        dom.createTodo(createdTodo);
        form.reset();
        modal.classList.remove("showModal");
    }
});

projectForm.addEventListener('submit', e => {
    e.preventDefault();
    let data = new FormData(e.target);
    dom.createProject(data.get("project-name"));
    projectForm.reset();
    projectForm.classList.remove("showModal");
});

document.querySelector('.slide').addEventListener('click', function (event) {
    console.log("clciked");
    event.stopPropagation();
});




