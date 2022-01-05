import { format, add, isDate, formatDistanceStrict } from 'date-fns'

let todos = []

// btn for clearing out local storage for testing purposes
let localprobtn = document.createElement("button")
localprobtn.innerText = "clear local storage"
localprobtn.addEventListener("click", function() {
    localStorage.clear()
})
document.querySelector('#topdiv').appendChild(localprobtn)

if (localStorage.getItem("todos") != null) {
    todos = JSON.parse(localStorage.getItem("todos"))
    todos.forEach(element => storeDateObjConv(element, false))
}

let projects = [
    projectConstructor("24 hours", "To-Dos that are due today.", undefined, undefined, undefined),
    projectConstructor("7 Days", "To-Dos that are due in 7 days.", undefined, undefined, undefined),
    projectConstructor("29 Days", "To-Dos that are due in 30 days.", undefined, undefined, undefined),
    projectConstructor("29+ Days", "To-Dos that are due after 30 days.", undefined, undefined, undefined),
    projectConstructor("Misc", "Miscellaneous todos", undefined, undefined, undefined),
]

if (localStorage.getItem("projects") != null) {
    projects = JSON.parse(localStorage.getItem("projects"))
    projects.forEach(element => storeDateObjConv(element, true))
}

function todoConstructor(title, desc, date, time, priority) {
    let datedue = ""
    if (date === "" && time === "") {
        datedue = "whenever"
    } else if (time === "") {
        datedue = new Date(Date.parse(`${date} 00:00`))
    } else if (date === "") {
        datedue = new Date(Date.parse(`${format(new Date(), "yyyy/MM/dd")} ${time}`))
    } else {
        datedue = new Date(Date.parse(`${date} ${time}`))
    }
    let todonum = todos.length
    let projectnum = undefined
    return {title, desc, datedue, priority, todonum, projectnum}
}

function projectConstructor(title, desc, date, time, priority) {
    let datedue = ""
    if (date === "" && time === "") {
        datedue = "whenever"
    } else if (time === "") {
        datedue = new Date(Date.parse(`${date} 00:00`))
    } else if (date === "") {
        datedue = new Date(Date.parse(`${format(new Date(), "yyyy/MM/dd")} ${time}`))
    } else {
        datedue = new Date(Date.parse(`${date} ${time}`))
    }
    let todos = []
    return {title, desc, datedue, priority, todos}
}

// converts the local storage dates from strings to date objects
function storeDateObjConv(obj, proTrue) {
    if (obj.datedue != undefined || obj.datedue != "whenever") {
        obj.datedue = new Date(Date.parse(obj.datedue))
    }
    if (proTrue === true) {
        obj.todos.forEach(element => storeDateObjConv(element, false))
    }
}

function renameTodo(newTitle, pronum, protodonum, todonum) {
    if (pronum != undefined) {
        projects[pronum].todos[protodonum].title = `${newTitle}`
    }
    console.log(todonum)
    todos[todonum].title = `${newTitle}`
}

function deleteTodo(pronum, protodonum, todonum) {
    todos.splice(todonum, 1)
    if (pronum != undefined) {
        projects[pronum].todos.splice(protodonum, 1)
        for (let i = protodonum; i < projects[pronum].todos.length; i++) {
            projects[pronum].todos[i].todonum -= 1
        }
    }
    for (let i = todonum; i < todos.length; i++) {
        todos[i].todonum -= 1
    }
}

// goes through the todos in the array and sorts them to where they should be
function todoSorter() {
    for (let i = 0; i < 5; i++) {
        projects[i].todos = []
    }
    for (let i = 0; i < todos.length; i++) {
        let timeUntilDueArr = []
        try {
            timeUntilDueArr = formatDistanceStrict(new Date(), todos[i].datedue).split(" ")
            switch (timeUntilDueArr[1]) {
                case "seconds":
                case "minutes":
                case "hours":
                    projects[0].todos.push(todos[i])
                    break;
                case "days":
                    if (parseInt(timeUntilDueArr[0]) <= 7) {
                        projects[1].todos.push(todos[i])
                    } else {
                        projects[2].todos.push(todos[i])
                    }
                    break;
                default:
                    projects[3].todos.push(todos[i])
            }
        }
        catch {
            projects[4].todos.push(todos[i])
        }
    }
}

function makeTodo(projectstatus, form) {
    if(projectstatus === true) {
        projects.push(projectConstructor(form[0].value, form[1].value, form[4].value, form[5].value, form[6].checked))
        todoSorter()
    } else if (projectstatus === false) {
        todos.push(todoConstructor(form[0].value, form[1].value, form[4].value, form[5].value, form[6].checked))
        todoSorter()
    } else {
        let todo = todoConstructor(form[0].value, form[1].value, form[4].value, form[5].value, form[6].checked)
        todo.projectnum = projectstatus
        projects[projectstatus].todos.push(todo)
        todos.push(todo)
        todoSorter()
    }
    saveArrs()
}

function saveArrs() {
    localStorage.setItem("todos", JSON.stringify(todos))
    localStorage.setItem("projects", JSON.stringify(projects))
}

// compiles all elements in an array into a div    
function compileArray(value) {
    let arr = undefined
    let compiledArray = []
    if (value == "projects") {
        arr = projects 
    } else {
        arr = projects[value].todos
    }

    for (let i = 0; i < arr.length; i++) {
        let element = document.createElement("div")
        element.textContent = arr[i].title
        element.number = i
        if (value != "projects") {
            element.todoNum = arr[i].todonum
        }
        compiledArray.push(element)
    }

    return compiledArray
}


function deleteProject(num) {
    let projectTodos = projects[num].todos
    let indexes = []
    let minusAmount = 1

    for (let i = 0; i < projectTodos.length; i++) {
        indexes.push(projectTodos[i].todonum)
    }

    todos = todos.filter(element => {
        return false == indexes.some(ele => {
            return ele == element.todonum 
        })
    })
    

    /*for (let i = 0; i < todos.length; i++) {
        if (indexes.some(element => (element === i))) {
            let num = i
            for (let n = indexes.indexOf(i); n < indexes.length; n++) {
                if (indexes[n + 1] == (num += 1)) {
                    minusAmount += 1
                } else {
                    break
                }
            }
        } else if (i < indexes[0]) {
            continue
        } else {
            todos[i].todonum -= minusAmount
        }
        
    }*/
    console.log(todos)
    projects.splice(num, 1)
}

function returnProjectTodo(projectnum, todonum) {
    let todo = projects[projectnum].todos[todonum]
    return todo
}

export {
    makeTodo, 
    compileArray, 
    returnProjectTodo, 
    renameTodo, 
    deleteTodo, 
    todoSorter, 
    saveArrs, 
    deleteProject
}