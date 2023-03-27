/*
Name: Course Project: To-do List Web App - Phase 1
Course Code: SODV1201
Class: Software Development Diploma program
Author: Charley Tsang
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Array holding the todo list items
// id, taskName, isComplete(false / true)
var todoItems = [];
var idCounter = 0;


// Section 1: #addNewInput, #addNewBtn, #discardBtn

// Add new Button: add new task to todoItems when clicked
$("#addNewBtn").click(function () {
    var newTask = $("#addNewInput").val();
    if (newTask !== "" && newTask.trim()) addTodo(newTask);
});

// Discard Button: clear input field when clicked
$("#discardBtn").click(function () {
    $("#addNewInput").val('');
});

// Create a new todo object with auto increment ID, taskName and complete status (false by default)
// push it into the `todoItems` array
function addTodo(taskName) {
    const todo = {
        id: idCounter++,
        taskName: taskName,
        isComplete: false,
    };
    todoItems.push(todo);
    $("#addNewInput").val(''); // reset input field
    displayAllOnGoingTasks();

}

// Build a task item for ongoing and completed task
// fn parameter is either 'markDone' or 'markUndone', which affects the icon and corresponding function
function getNewItem(todo, fn = 'markDone') {
    let icon = 'check_circle'
    let iconClass = 'markDoneBtn'
    let completed = ''
    if (fn == 'markUndone') {
        icon = 'undo'
        iconClass = 'markUndoneBtn'
        completed = 'completed' // let css change text color to grey for completed tasks
    }
    var newItem = `
    <div class="taskItem">
        <div class="mark">
            <span onclick="${fn}('${todo.id}')" class="material-symbols-outlined icons ${iconClass}">
                ${icon}
            </span>
        </div>
        <div class="taskNameDiv">
            <span class="taskName ${completed}"> ${todo.taskName} </span>
        </div>
        <div class="bin">
            <span onclick="removeItem('${todo.id}');" class="material-symbols-outlined icons binBtn">
                delete
            </span>
        </div>
    </div>
`
    return newItem
}

// remove item when bin icon is clicked. Completely removed from array.
function removeItem(id) {
    for (var i = 0; i < todoItems.length; i++) {
        if (todoItems[i].id == id) {
            todoItems.splice(i, 1);
            break;
        }
    }
    displayAllOnGoingTasks();
    displayAllCompletedTasks();
}

// When the green check icon is clicked, completed task is removed from ongoing, and is appended to completed
function markDone(id) {
    for (var i = 0; i < todoItems.length; i++) {
        if (todoItems[i].id == id) {
            todoItems[i].isComplete = true;
            break;
        }
    }
    displayAllOnGoingTasks();
    displayAllCompletedTasks();
}

// Reverse of markDone(), when the grey undo icon is clicked. Put the completed task back to ongoing
function markUndone(id) {
    for (var i = 0; i < todoItems.length; i++) {
        if (todoItems[i].id == id) {
            todoItems[i].isComplete = false;
            break;
        }
    }
    displayAllOnGoingTasks();
    displayAllCompletedTasks();

}

// Rebuild all ongoing tasks
function displayAllOnGoingTasks() {
    $("#ongoingTasks").empty();
    for (var i = 0; i < todoItems.length; i++)
        if (!todoItems[i].isComplete) $("#ongoingTasks").append(getNewItem(todoItems[i]));
    if ($('#ongoingTasks').is(':empty'))
        $("#ongoingTasks").append('<div class="emptyMessage">Your to-do list is empty.</div>')
        
}

// Rebuild all completed tasks
function displayAllCompletedTasks() {
    $("#completedTasks").empty();
    for (var i = 0; i < todoItems.length; i++)
        if (todoItems[i].isComplete) $("#completedTasks").append(getNewItem(todoItems[i], 'markUndone'))
    if ($('#completedTasks').is(':empty'))
        $("#completedTasks").append('<div class="emptyMessage">Your completed list is empty.</div>')
}


$(document).ready(function () {
    displayAllOnGoingTasks();
    displayAllCompletedTasks();
});