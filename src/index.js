import "./index.css";
import Todo from "./todo";
import createTodo from "./todoDom";

//create todos, 
//edit todos,
//mark to do as finished
//save to local storage
//view todo's
//validate form submission


const todo1 = new Todo("odin project", "entire course", "2024-12-01", "high");
console.log(todo1);
createTodo(todo1);

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
        const todo = data.get("todo");
        const description = data.get("description");
        const date = data.get("date");
        const createdTodo = new Todo(todo, description, date, priority);
        createTodo(createdTodo);
        form.reset();
        modal.classList.remove("showModal");
    }
});




