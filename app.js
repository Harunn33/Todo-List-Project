// Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const listGroup = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector("#clear-todos");

const eventListeners = () => {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearBtn.addEventListener("click", clearAllTodos);
};
const clearAllTodos = () => {
  // Arayüzden todoları temizleme
  if (confirm("Tümünü silmek istediğinize emin misiniz efendim ?")) {
    //listGroup.innerHTML = ""; // Yavaş yöntem

    while (listGroup.firstElementChild != null) {
      listGroup.removeChild(listGroup.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
};
const filterTodos = (e) => {
  const filterValue = e.target.value.toLowerCase();
  const listItem = document.querySelectorAll(".list-group-item");

  listItem.forEach((listItem) => {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display:none !important");
    } else {
      listItem.setAttribute("style", "display:block");
    }
  });
};
const deleteTodo = (e) => {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Todo silme işlemi başarılı.");
  }
};
const deleteTodoFromStorage = (deletetodo) => {
  let todos = getTodosFromStorage();
  todos.forEach((todo, index) => {
    if (todo === deletetodo) {
      todos.splice(index, 1); //Arrayden değeri silebiliriz
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};
const loadAllTodosToUI = () => {
  let todos = getTodosFromStorage();
  todos.forEach((todo) => {
    addTodoToUI(todo);
  });
};
const addTodo = (e) => {
  const newTodo = todoInput.value.trim();
  if (newTodo === "") {
    showAlert("danger", "Bir todo girmelisiniz!!");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "Todo başarılı bir şekilde eklendi.");
  }
  e.preventDefault();
};

const showAlert = (type, message) => {
  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.setAttribute("role", "alert");
  div.innerHTML = message;
  firstCardBody.appendChild(div);

  // setTimeOut

  setTimeout(() => {
    div.remove();
  }, 1000);
};
const getTodosFromStorage = () => {
  // Storagedan bütün todoları alcak
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
};
const addTodoToStorage = (newTodo) => {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
};
//String değerini list iteme ekleyecek
const addTodoToUI = (newTodo) => {
  // List oluşturma
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex justify-content-between";
  //Link oluşturma
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";
  // Text Node Ekleme
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  // Todo liste list itemi ekleme

  listGroup.appendChild(listItem);
  todoInput.value = "";
};

eventListeners();
