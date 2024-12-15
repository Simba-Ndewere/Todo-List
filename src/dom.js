import openImage from './open.png'

const bottom = document.querySelector(".bottom");
const cars = document.querySelector(".cars");

class Dom {

  static createTodo = (todo) => {

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todoContainer");
    bottom.appendChild(todoContainer);

    const title = document.createElement("div");
    title.textContent = todo.title.toLowerCase();

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
      cars.appendChild(projectOption);
  }

  static getAllProjects = () => {
    //get all projects from local storage
  }

}

export default Dom;