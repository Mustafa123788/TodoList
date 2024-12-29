const inputTodo = document.querySelector(".todoInput");
const addBtn = document.getElementById("addBtn");
const listTodo = document.querySelector(".todo-list");
const deleteBtn = document.querySelector(".delete");

addBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    let inputValue = inputTodo.value;
    if (inputValue === "") {
        alert("Please enter a task");
        inputTodo.classList.add("red-border");//bu satır çalışmıyor
        return;
    }else{
        // boş değilse, buraya todo ekleyecek kodları yaz

        let todo = document.createElement("div");
        todo.classList.add("todo");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        todo.appendChild(checkbox);

        inputTodo.classList.remove("red-border");
        let newTodo = document.createElement("li");
        newTodo.innerHTML = inputValue;
        todo.appendChild(newTodo);

        let deleteBtn = document.createElement("span");
        deleteBtn.classList.add("delete");
        deleteBtn.innerHTML = "Delete";
        todo.appendChild(deleteBtn);

        listTodo.appendChild(todo);
        inputTodo.value = "";

        addLocalStorage(inputValue);

        deleteBtn.addEventListener("click",()=>{
            todo.remove();
            removeTodoFromLocalStorage(inputValue);
        })
    }
})
function saveTodoToLocalStorage(todoText) {
    let todos = getTodosFromLocalStorage();
    todos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
}

let todos = [];
function addLocalStorage(e){
    checkLocalStorage();
    todos.push(e);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkLocalStorage(){
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function removeTodoFromLocalStorage(){
    checkLocalStorage();
    let todos = arguments[0]; 
    todos.forEach((todo, index) => {
        if(todo === inputValue){
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromLocalStorage() {
    let todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
}

function removeTodoFromLocalStorage(todoText) {
    let todos = getTodosFromLocalStorage();
   todos = todos.filter(todos => todos !== todoText)
    localStorage.setItem("todos",JSON.stringify(todos));
}