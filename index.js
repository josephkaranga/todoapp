let title = document.querySelector("#task-title")
let description = document.querySelector("#task-description")
let date = document.querySelector("#task-date")
let submitNewTodo = document.querySelector("#submit-new-todo")
let Form = document.querySelector("#task-form")

let uncompletedTasks = document.querySelector("#Uncompleted-tasks");
let completedTasks = document.querySelector("#completed-tasks");

let todos = fetchFromStorage(); // Call the fetchFromStorage function to get all todos

let newTodo = {
    "id": Math.round(Math.random() * 10000), // Math functions - .random - generates a random decimal between 0 and 1
    "title": "",
    "description": "",
    "date": "",
    "completed": false
}

title.addEventListener("input", function(event) {
    newTodo.title = event.target.value;
})
description.addEventListener("input", function(event) {
    newTodo.description = event.target.value;
})
date.addEventListener("input", function(event) {
    newTodo.date = event.target.value;
})
submitNewTodo.addEventListener("click", function(event) {
    event.preventDefault();

    todos.push(newTodo);
    saveToStorage(JSON.stringify(todos));

    // remove old values from the newTodo
    newTodo.id = "";
    newTodo.title = "";
    newTodo.description = "";
    newTodo.date = "";

    // reload page
    location.reload();
})

Form.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(Form);
})

function fetchFromStorage() { // A function that fetches the todos from localStorage
    let storedTodos = JSON.parse(localStorage.getItem("todos"));
    if(storedTodos) {
        return storedTodos;
    } else {
        return [];
    }
}

function saveToStorage(todos) { // A function that saves todos to localStorage
    localStorage.setItem("todos", todos);
}

function displayUncompletedTodos() {
    todos.forEach(function(todo) {
        if( ! todo.completed) {
            uncompletedTasks.innerHTML += `<li>
            <h5>${todo.title}</h5>
            <p>${todo.description}</p>
            <button type="button" class="complete-todo" data-todo-id="${todo.id}">Complete</button>
            <button type="button" class="delete-todo" data-todo-id="${todo.id}">Delete</button>
            </li>`
        }
        
    })
}

function displayCompletedTodos() {
    todos.forEach(function(todo) {
        if(todo.completed) {  // check if the todo has a value completed: true
            completedTasks.innerHTML += `<li>
            <h5>${todo.title}</h5>
            <p>${todo.description}</p>
            <button type="button" class="complete-todo" data-todo-id="${todo.id}">Complete</button>
            <button type="button" class="delete-todo" data-todo-id="${todo.id}">Delete</button>
            </li>`
        } 
    })
}

// Call these 2 functions to display the todos
displayUncompletedTodos();
displayCompletedTodos();

// Complete todo
let completeButtons = document.querySelectorAll(".complete-todo");
completeButtons.forEach(function(completeButton) {
    completeButton.addEventListener("click", function() {
        let todoId = completeButton.getAttribute("data-todo-id");
        todos.forEach(function(todo, i) {
            if(todo.id == Number(todoId)) {
                todo.completed = ! todo.completed // Flip the value to it's opposite, if tru make it false and vice versa
            }
        })
        saveToStorage(JSON.stringify(todos));
        // reload page
        location.reload();
    })
})

// Delete todo
let deleteTodoButtons = document.querySelectorAll(".delete-todo");

deleteTodoButtons.forEach(function(deleteButton) {
    deleteButton.addEventListener("click", function() {
        let todoId = deleteButton.getAttribute("data-todo-id");
        console.log(todos);
        todos.forEach(function(todo, i) {
            if(todo.id == Number(todoId)) {
                todos.splice(todos.indexOf(i), 1);
            }
        })
        saveToStorage(JSON.stringify(todos));
        // reload page
        location.reload();
    })
})