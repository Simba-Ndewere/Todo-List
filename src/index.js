import "./index.css";
import Todo from "./todo";
import createTodo from "./todoDom";

//create todos, 
//edit todos,
//change dom
//save to local storage
//view todo's

const todo1 = new Todo("odin project", "entire course", "12/23/2024", "Medium", false);
console.log(todo1);
createTodo(todo1);
createTodo(todo1);
