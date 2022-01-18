import { format, add, isDate, formatDistanceStrict, isThisSecond } from 'date-fns'
import {todoCon, projectCon} from './Constructors'

let todos = []

let projects = []

// puts the 5 base projects into the project array
let titles = [
    "Today",
    "7 Days",
    "29 Days",
    "29+ Days",
    "Misc"
]
for (let i = 0; i < 5; i++) {
    projects.push(createProject(titles[i], ""))
}
console.log(projects)

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

function deleteTodo(todonum) {
    todos.splice(todonum, 1)
}

function deleteProject(num) {
    /*
    let protodos = []
    let minusby = 0

    for (let i = 0; i < projects.length; i++) {
        protodos.push(projects[i].getTodos())
    }
    
    let todostodel = protodos[num]
    todostodel.sort((first, second) => {
        if (first < second) {
            return 1
        } else if(first > second) {
            return -1
        } else {
            return 0
        }
    })

    function changeprojectnums(elementnum, numtocheck, todosdeletearr) {
        if (elementnum = numtocheck) {
            todos.splice(elementnum, 1)
        } else if (elementnum > numtocheck) {
            elementnum -= 1
        }

        if (todosdeletearr[i])
        return elementnum
    }

    for (let i = 0; i < todostodel; i++) {
        let numtocheck = todostodel[i]
        let copytodos = []
        protodos.forEach(element => {
            let temptodostorage = []
            element.forEach(element => {
                temptodostorage.push(changeprojectnums(element, numtocheck))
            })
            copytodos.push(temptodostorage)
        })
        protodos = copytodos
    }

    problem: projects wont get sliced

    for (let i = 0; i < 0; i++) {
        projects[i].setTodoList(copytodos[i])
    }

    copytodos.forEach(element => {
        element.setTodoList(copytodos[])
    })

    projects.splice(num, 1)
    
    possibly not even needed as the object might have a link
    to the original when placed in the projects todos
    ::need further testing 
    */
}

// goes through the todos in the array and sorts them to where they should be
function todoSorter() {
    for (let i = 0; i < 5; i++) {
        projects[i].emptyTodos()
    }
    for (let i = 0; i < todos.length; i++) {
        try {
            let timeUntilDueArr = formatDistanceStrict(new Date(), todos[i].getDatedue()).split(" ")
            switch (timeUntilDueArr[1]) {
                case "seconds":
                case "minutes":
                case "hours":
                    projects[i].addTodo(i)
                    break;
                case "days":
                    if (parseInt(timeUntilDueArr[0]) <= 7) {
                        projects[1].addTodo(i)
                    } else {
                        projects[2].addTodo(i)
                    }
                    break;
                default:
                    projects[3].addTodo(i)
            }
        }
        catch {
            projects[4].addTodo(i)
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
        projects.push(createProject(form[0].value, form[1].value, form[4].value, form[5].value, form[6].checked))
        todoSorter()
    } else if (projectstatus === false) {
        console.log("elo")
        todos.push(createTodo(form[0].value, form[1].value, form[4].value, form[5].value, form[6].checked))
        todoSorter()
    } else {
        let todo = createTodo(form[0].value, form[1].value, form[4].value, form[5].value, form[6].checked)
        projects[projectstatus].addTodo(todos[-1])
        todos.push(todo)
        todoSorter()
    }
    // sortImportant()
    saveArrs()
}

function saveArrs() {
    localStorage.setItem("todos", JSON.stringify(todos))
    localStorage.setItem("projects", JSON.stringify(projects))
}

console.log(projects)

// compiles all elements in an array into a div    
function compileArray(value) {
    let arr = undefined
    let compiledArray = []
    if (value == "projects") {
        arr = projects 
    } else {
        arr = projects[value].getTodos()
    }
    console.log(projects)
    for (let i = 0; i < arr.length; i++) {
        let div = document.createElement("div")
        div.textContent = `${arr[i].getTitle()}`
        div.number = todos.indexOf(arr[i])
        compiledArray.push(div)
    }
    console.log()
    return compiledArray
}

function returnProjectTodo(todonum) {
    return todos[todonum]
}

export {
    makeTodo, 
    compileArray, 
    renameTodo, 
    deleteTodo,  
    saveArrs, 
    deleteProject,
    todoSorter,
    returnProjectTodo
}