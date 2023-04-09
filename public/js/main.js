// /*
// Name: Course Project: To-do List Web App - Phase 2
// Course Code: SODV1201
// Class: Software Development Diploma program
// Author: Charley Tsang
// */   

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Remove item when bin icon is clicked. Completely removed from array.
// Updated for phase 2. Use AJAX POST request to delete corresponding item
function removeItem(id, task) {
    $.post("/delete", { id, task }, (data, status) => { })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.error(`AJAX request failed: ${textStatus}, ${errorThrown}`);
            $.post("/failure", { message: `AJAX request failed: ${textStatus}, ${errorThrown}` });
        }).then(() => location.reload());
}

// When the green check icon is clicked, completed task is removed from ongoing, and is appended to completed
function changeStatus(id, task, status) {
    $.post("/update", { id, task, status }, (data, status) => { })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.error(`AJAX request failed: ${textStatus}, ${errorThrown}`);
            $.post("/failure", { message: `AJAX request failed: ${textStatus}, ${errorThrown}` });
        }).then(() => location.reload());
}

/************  Note : All of the following functions are unused in Phase 2 *************/
/*
// Array holding the todo list items
// id, taskName, isComplete(false / true)
var todoItems = [];
var idCounter = 0;


// Section 1: #addNewInput, #addNewBtn, #discardBtn

// Add new Button: add new task to todoItems when clicked 
$("#addNewBtn").click(function () {
    var newTask = $("#addNewInput").val();
    if (newTask !== "" && newTask.trim()) {
        addTodo(newTask);
    }
});

// Discard Button: clear input field when clicked Todo: delete this function 
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

// Unused in Phase 2
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

// Unused in Phase 2
// Rebuild all ongoing tasks
function displayAllOnGoingTasks() {
    $("#ongoingTasks").empty();
    for (var i = 0; i < todoItems.length; i++)
        if (!todoItems[i].isComplete) $("#ongoingTasks").append(getNewItem(todoItems[i]));
    if ($('#ongoingTasks').is(':empty'))
        $("#ongoingTasks").append('<div class="emptyMessage">Your to-do list is empty.</div>')
}

// Unused in Phase 2
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

*/