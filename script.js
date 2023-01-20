/*

* Title: To Do Application using vanilla JS DOM
* Date: 1/20/2023

*/

let newTask    = document.querySelector("#new-task");
let form       = document.querySelector("form");
let todoUL     = document.querySelector("#items");
let completeUL = document.querySelector(".complete-list ul");

// Fucntions 

let createTask = function (task) {
    let label    = document.createElement("label");
    let checkbox = document.createElement("input");
    let listItem = document.createElement("li");

    label.innerText = task;
    checkbox.type   = "checkbox";

    listItem.appendChild(checkbox);
    listItem.appendChild(label);

    return listItem;
}

let addTask = function (event) {
    event.preventDefault();
    let listItem = createTask(newTask.value);
    todoUL.appendChild(listItem);
    newTask.value = "";
    // Bind new list item to the incomplete list
    bindIncompleteItems(listItem, completeTask);
}

let completeTask = function() {
    let listItem = this.parentNode;
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.className = 'delete';
    listItem.appendChild(deleteBtn);

    let checkbox = listItem.querySelector('input[type="checkbox"]');
    checkbox.remove();
    completeUL.appendChild(listItem);
    bindCompleteItems(listItem, deleteTask);
}

let deleteTask = function () {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}

let bindIncompleteItems = function (taskItem, checkboxClick) {
    let checkbox = taskItem.querySelector("input[type='checkbox']");
    checkbox.onchange = checkboxClick;
}

let bindCompleteItems = function(taskItem, deleteButtonClick) {
    let deleteButton = taskItem.querySelector('.delete');
    deleteButton.onclick = deleteButtonClick;
}

for (let i = 0; i < todoUL.children.length; i++) {
    bindIncompleteItems(todoUL.children[i], completeTask)
}

for (let i = 0; i < completeUL.children.length; i++) {
    bindCompleteItems(completeUL.children[i], deleteTask)
}

form.addEventListener('submit', addTask)