var addButton = document.getElementById("add-button");
var clearCompletedButton = document.getElementById("clear-completed-button");
var emptyListButton = document.getElementById("empty-button");
var saveButton = document.getElementById("save-button");
var loadButton = document.getElementById("load-button")

var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");
var toDoInfo = {
    "task": "Thing I need to do",
    "completed": false
}

addButton.addEventListener("click", addToDoItem);
function addToDoItem(){
    var itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
    // alert("Add button pressed");
}

clearCompletedButton.addEventListener("click", clearCompletedToDoItems);
function clearCompletedToDoItems(){
    var completedItems = toDoList.getElementsByClassName("completed");
    while (completedItems.length > 0){
        completedItems.item(0).remove();
    }
    // alert("Clear button pressed");
}

emptyListButton.addEventListener("click", emptyList);
function emptyList(){
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0){
        toDoItems.item(0).remove();
    }
    // alert("Empty list button pressed");
}

saveButton.addEventListener("click", saveList);
function saveList(){
    var toDos = [];
    for(var i = 0; i < toDoList.children.length; i++){
        var toDo = toDoList.children.item(i);
        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        }
        toDos.push(toDoInfo);
    }
    localStorage.setItem("toDos", JSON.stringify(toDos));
    alert("Save list button pressed");
}

loadButton.addEventListener("click", loadList);
function loadList(){
    if(toDoList.children.length > 0){
        emptyList();
    }
    if(localStorage.getItem("toDos") != null){
        var toDos = JSON.parse(localStorage.getItem("toDos"));
        for(var i = 0; i < toDos.length; i++){
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}


function newToDoItem(itemText, completed){
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add("Completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

function toggleToDoItemState(){
    if(this.classList.contains("completed")){
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}