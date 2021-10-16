// Selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// EventListeners
todoBtn.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addToDo(event) {
  //prevent form from submitting
  event.preventDefault();
  // create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create new li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // add todo to localStorage
  saveLocalTodos(todoInput.value);
  // check mark button
  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = '<i class="fas fa-check"></i>';
  completedBtn.classList.add("check-btn");
  todoDiv.appendChild(completedBtn);
  // trash/dlt button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //Append to todo list
  todoList.appendChild(todoDiv);
  // Clear input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  // Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
  // check mark
  if (item.classList[0] === "check-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed-todo");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed-todo")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed-todo")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//localstorage
function saveLocalTodos(todo) {
  //check if we something already in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  //check if we something already in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIdx = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIdx), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
