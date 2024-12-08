const bottom = document.querySelector(".bottom");

const createTodo = (todo) => {
  console.log(todo);
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todoContainer");
  bottom.appendChild(todoContainer);

  const title = document.createElement("div");
  title.textContent = todo.title.toUpperCase();

  const date = document.createElement("div");
  date.textContent = todo.dueDate;

  const leftSide = document.createElement("div");
  leftSide.classList.add("leftSide");

  const rightSide = document.createElement("div");
  rightSide.classList.add("rightSide");

  todoContainer.appendChild(leftSide);
  todoContainer.appendChild(rightSide);

  const priorityTodo = document.createElement("div");
  priorityTodo.classList.add("priorityTodo");

  if(todo.priority == "low"){
    priorityTodo.style.backgroundColor = "green";
  }

  if(todo.priority == "medium"){
    priorityTodo.style.backgroundColor = "orange";
  }

  if(todo.priority == "high"){
    priorityTodo.style.backgroundColor = "red";
  }
  
  const checkLabel = document.createElement("label");
  checkLabel.classList.add("containerCheck");

  const checkInput = document.createElement("input");
  checkInput.setAttribute("type", "checkbox");

  const checkSpan = document.createElement("span");
  checkSpan.classList.add("checkmark");

  checkLabel.appendChild(checkInput);
  checkLabel.appendChild(checkSpan);

  leftSide.appendChild(checkLabel);
  leftSide.appendChild(title);

  rightSide.appendChild(date);
  rightSide.appendChild(priorityTodo);
}

export default createTodo;