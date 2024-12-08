import "./index.css";
import Todo from "./todo";
import createTodo from "./todoDom";

//create todos, 
//edit todos,
//mark to do as finished
//save to local storage
//view todo's
//validate form submission

const todo1 = new Todo("odin project", "entire course", "12/23/2024", "Medium", false);
console.log(todo1);
createTodo(todo1);
createTodo(todo1);

const form = document.querySelector(".modal-container");
form.addEventListener('submit', e => {
    e.preventDefault();
    let checked = false;
    for(let a = 1; a < 4; a++){
        const radioButton = document.getElementById("dot-" + a);
        if(radioButton.checked){
            checked = true;
            break;
        }
    }

    if(!checked){
        const error = document.querySelector(".error");
        error.innerText = "please enter priority"
    }

    console.log("submitted");
});
