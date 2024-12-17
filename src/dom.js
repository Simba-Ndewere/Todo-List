import Storage from "./localstorage";
import openImage from './open.png'
import Todo from "./todo";

const bottom = document.querySelector(".bottom");
const projectValue = document.querySelector(".project-value");
const modal = document.querySelector(".modal-container");
const modalTitle = document.querySelector(".modal-title");
const modalButton = document.querySelector(".btnSubmit");
const addToDo = document.querySelector(".signCreate");
const addProject = document.querySelector(".projectCreate");
const navMobile = document.querySelector(".nav-icon");
const deleteButton = document.querySelector(".deleteButton");

class Dom {

  static createTodo = (todo) => {

    const todoContainer = document.createElement("div");
    todoContainer.id = "cont" + todo.id.toString();
    todoContainer.classList.add("todoContainer");
    bottom.appendChild(todoContainer);

    const title = document.createElement("div");
    title.textContent = todo.title.toLowerCase();
    title.id = "title" + todo.id.toString();

    const date = document.createElement("div");
    date.id = "date" + todo.id.toString();
    date.textContent = todo.dueDate;

    const leftSide = document.createElement("div");
    leftSide.classList.add("leftSide");

    const rightSide = document.createElement("div");
    rightSide.classList.add("rightSide");

    todoContainer.appendChild(leftSide);
    todoContainer.appendChild(rightSide);

    const priorityTodo = document.createElement("div");
    priorityTodo.classList.add("priorityTodo");
    priorityTodo.id = "priority" + todo.id.toString();

    if (todo.priority == "low") {
      priorityTodo.style.backgroundColor = "green";
    }

    if (todo.priority == "medium") {
      priorityTodo.style.backgroundColor = "orange";
    }

    if (todo.priority == "high") {
      priorityTodo.style.backgroundColor = "red";
    }

    const checkLabel = document.createElement("label");
    checkLabel.classList.add("containerCheck");

    const checkInput = document.createElement("input");
    checkInput.setAttribute("type", "checkbox");
    checkInput.id = "-" + todo.id.toString();
    checkInput.classList.add("todo-checkbox");

    const checkSpan = document.createElement("span");
    checkSpan.classList.add("checkmark");

    const open = document.createElement("div");
    open.classList.add("open");
    const openImg = document.createElement("img");
    openImg.classList.add("openImg");
    openImg.src = openImage;
    openImg.id = "_" + todo.id.toString();
    open.appendChild(openImg);

    checkLabel.appendChild(checkInput);
    checkLabel.appendChild(checkSpan);

    leftSide.appendChild(checkLabel);
    leftSide.appendChild(title);

    rightSide.appendChild(date);
    rightSide.appendChild(open);
    rightSide.appendChild(priorityTodo);
  }

  static updateToDoContainer = (updatedToDo) => {
    const todoId = updatedToDo.id;
    const title = document.getElementById("title" + todoId.toString());
    const date = document.getElementById("date" + todoId.toString());
    const priority = document.getElementById("priority" + todoId.toString());

    if (updatedToDo.priority == "low") {
      priority.style.backgroundColor = "green";
    }

    if (updatedToDo.priority == "medium") {
      priority.style.backgroundColor = "orange";
    }

    if (updatedToDo.priority == "high") {
      priority.style.backgroundColor = "red";
    }

    title.textContent = updatedToDo.title.toLowerCase();
    date.textContent = updatedToDo.dueDate.toLowerCase();

  }

  static completeTodo = (todo, event) => {

    const title = document.getElementById("title" + todo._id.toString());
    const newToDo = new Todo(todo._id, todo._title, todo._description, todo._dueDate, todo._priority, todo._project, event.target.checked);
    if (event.target.checked) {
      title.classList.add("completed");
      Storage.deleteTodo(todo);
      Storage.saveTodo(newToDo);
      const priority = document.getElementById("priority" + todo._id.toString());
      priority.style.backgroundColor = "gray";
    } else {
      title.classList.remove("completed");
      Storage.deleteTodo(todo);
      Storage.saveTodo(newToDo);

      const priorityTodo = document.getElementById("priority" + todo._id.toString());

      if (todo._priority == "low") {
        priorityTodo.style.backgroundColor = "green";
      }

      if (todo._priority == "medium") {
        priorityTodo.style.backgroundColor = "orange";
      }

      if (todo._priority == "high") {
        priorityTodo.style.backgroundColor = "red";
      }

    }
  }

  static createProject = (project) => {
    const projectFolder = document.querySelectorAll(".projects");

    for (let a = 0; a < projectFolder.length; a++) {
      const newProject = document.createElement("div");
      newProject.textContent = "- " + project.name.toLowerCase();

      newProject.addEventListener('mouseenter', () => {
        newProject.style.color = "#40bcd8";
        newProject.style.fontSize = "24px";
        newProject.style.cursor = "pointer";
      });

      newProject.addEventListener('mouseleave', () => {
        newProject.style.color = 'black';
        newProject.style.fontSize = "22px";
        newProject.style.cursor = "none";
      });

      projectFolder[a].appendChild(newProject);
    }
  }

  static addProjectToDropDown = (project) => {
    const projectOption = document.createElement("option");
    projectOption.value = project.name;
    projectOption.textContent = project.name;
    projectValue.appendChild(projectOption);
  }

  static todoCheckbox = (todo) => {
    const title = document.getElementById("title" + todo.id.toString());
    title.classList.add("completed");
    const checkbox = document.getElementById("-" + todo.id);
    checkbox.checked = true;
    const priority = document.getElementById("priority" + todo.id.toString());
    priority.style.backgroundColor = "gray";
  }

  static editModal = (todo) => {
    modal.classList.add("showModal");
    modalTitle.textContent = "VIEW TODO";
    modalButton.textContent = "UPDATE";
    deleteButton.classList.remove("hide");

    const todoTitle = document.querySelector(".todo-title");
    const todoDescription = document.querySelector(".todo-description");
    const todoDate = document.querySelector(".todo-date");
    const todoProject = document.querySelector(".project-value");

    if (todo._priority == 'low') {
      const priorityView = document.getElementById("dot-1");
      priorityView.checked = true;
    }

    if (todo._priority == 'medium') {
      const priorityView = document.getElementById("dot-2");
      priorityView.checked = true;
    }

    if (todo._priority == 'high') {
      const priorityView = document.getElementById("dot-3");
      priorityView.checked = true;
    }

    todoTitle.value = todo._title;
    todoDescription.value = todo._description;
    todoDate.value = todo._dueDate;
    todoProject.value = todo._project;
  }

  static addUnclickable = () => {
    addToDo.classList.add("unclickable");
    addProject.classList.add("unclickable");
    navMobile.classList.add("unclickable");
    bottom.classList.add("unclickable");
  }

  static removeUnclickable = () => {
    addToDo.classList.remove("unclickable");
    addProject.classList.remove("unclickable");
    navMobile.classList.remove("unclickable");
    bottom.classList.remove("unclickable");
  }

  static deleteTodoContainer = (containerId) => {
    const todoCont = document.getElementById("cont" + containerId.toString());
    bottom.removeChild(todoCont);
    const todoId = containerId;
    Storage.deleteTodoById(todoId);
  }

}

export default Dom;