import { format, add, isDate, isAfter, isThisSecond, addDays, startOfDay } from 'date-fns'
import {todoCon, projectCon} from './Constructors'
var _ = require('lodash')

let todos = []

let projects = []

// puts the 5 base projects into the project array
function createBaseProjects() {
    let titles = [
        "Past Deadline",
        "Tomorrow",
        "7 Days",
        "29 Days",
        "29+ Days",
        "Misc"
    ]
    
    let descriptions = [
        "Todos that are now past their deadline.",
        "Todos that are due Tomorrow.",
        "Todos that are due in the next week.",
        "Todos that are due in the next month.",
        "Todos that are due later than a month.",
        "Todos that don't have a duedate."
    ]
    
    for (let i = 0; i < titles.length; i++) {
        projects.push(createProject(titles[i], descriptions[i]))
    }
}

/*if (localStorage.getItem("todos") != null) {
    todos = JSON.parse(localStorage.getItem("todos"))
    todos.forEach(element => storeDateObjConv(element, false))
}

if (localStorage.getItem("projects") != null) {
    projects = JSON.parse(localStorage.getItem("projects"))
}

btn for clearing out local storage for testing purposes
let localprobtn = document.createElement("button")
localprobtn.innerText = "clear local storage"
localprobtn.addEventListener("click", function() {
    localStorage.clear()
})
document.querySelector('#topdiv').appendChild(localprobtn)

// converts the local storage dates from strings to date objects
function storeDateObjConv(obj, proTrue) {
    let datedue = obj.getDatedue()
    if (datedue != undefined || datedue != "whenever") {
        obj.setDatedue(new Date(Date.parse(obj.datedue)))
    }
}*/

function renameTodo(todonum, name) {
    todos[todonum].setTitle(name)
}

function changeDate(todonum, newDate) {
    todos[todonum].setDatedue(newDate)
}

function changeDesc(todonum, newDesc) {
    todos[todonum].setDesc(newDesc)
}

function deleteTodo(todonum) {
    todos.splice(todonum, 1)
}

function deleteProject(pronum) {
    let projTodos = projects[pronum].getTodos()
    
    for (let i = 0; i < projTodos.length; i++) {
        todos.splice(myIndexOf(todos, projTodos[i]), 1)
    }

    projects.splice([pronum], 1)
}

// goes through the todos in the array and sorts them to where they should be
function todoSorter() {
    for (let i = 0; i < 6; i++) {
        projects[i].emptyTodos()
    }
    for (let i = 0; i < todos.length; i++) {
        let datedue = todos[i].getDatedue()
        if (datedue.toString() === "Invalid Date") {
            projects[5].addTodo(todos[i])
        } else if (isAfter(datedue, startOfDay(addDays(new Date(), 30)))) {
            projects[4].addTodo(todos[i])
        } else if (isAfter(datedue, startOfDay(addDays(new Date(), 7)))) {
            projects[3].addTodo(todos[i])
        } else if (isAfter(datedue, startOfDay(addDays(new Date(), 1)))) {
            projects[2].addTodo(todos[i])
        } else if (isAfter(datedue, startOfDay(new Date()))) {
            projects[1].addTodo(todos[i])
        } else {
            projects[0].addTodo(todos[i])
        }
    }
    saveArrs()
}

function createTodo(title, desc, date, time, priority) {
    let newTodo = todoCon()
    newTodo.quickMake(title, desc, date, time, priority)
    return newTodo
}

function createProject(title, desc) {
    let newProject = projectCon()
    newProject.quickMake(title, desc)
    return newProject
}

function makeTodo(projectstatus, form) {
    if(projectstatus === true) {
        projects.push(createProject(form[0].value, form[1].value))
        todoSorter()
    } else if (projectstatus === false) {
        
        todos.push(createTodo(form[0].value, form[1].value, form[4].value, form[5].checked))
        todoSorter()
    } else {
        let todo = createTodo(form[0].value, form[1].value, form[4].value, form[5].checked)
        todos.push(todo)
        
        projects[projectstatus].addTodo(todos.at(-1))
        
        todoSorter()
    }
    // sortImportant()
    
    saveArrs()
}

function saveArrs() {
    localStorage.setItem("todos", JSON.stringify(todos))
    localStorage.setItem("projects", JSON.stringify(projects))
}

function myIndexOf(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (_.isEqual(array[i], item)) return i;
    }
    return -1;
}

// compiles all elements in an array into a div    
function compileArray(value) {

    let arr = undefined
    let compiledArray = []

    if (value == "projects") {
        arr = projects 
    } else {
        arr = projects[value].getTodos()

    }

    for (let i = 0; i < arr.length; i++) {
        let div = document.createElement("div")
        let title = document.createElement("p")
        title.textContent = `${arr[i].getTitle()}`
        title.style.pointerEvents = "none"
        div.appendChild(title)
        
        if (value == "projects") {
            div.number = i
        } else {
            div.number = myIndexOf(todos, arr[i])
            if (arr[i].getPriority() == true) {
                div.style.order = "-1"
            }
            let date = document.createElement("p")
            try {
                date.textContent = `${format(arr[i].getDatedue(), "dd/MM/yyyy")}`
            }
            catch {
                date.textContent = `No Date Entered`
            }
            date.style.pointerEvents = "none"
            div.appendChild(date)
        }
        compiledArray.push(div)
    }

    return compiledArray
}

function returnProjectTodoNum(todonum, pronum) {
    return myIndexOf(projects[pronum].getTodos(), todos[todonum])
}

function returnProject(proNum) {
    return projects[proNum]
}

function returnTodo(todonum) {
    return todos[todonum]
}

createBaseProjects()

export {
    makeTodo, 
    compileArray, 
    renameTodo, 
    deleteTodo,  
    saveArrs, 
    deleteProject,
    todoSorter,
    returnProjectTodoNum,
    returnTodo,
    returnProject,
    changeDate,
    changeDesc
}