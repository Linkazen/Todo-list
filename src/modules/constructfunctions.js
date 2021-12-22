import { format, add, isDate, formatDistanceStrict } from 'date-fns'

// localStorage.setItem(todos)

let todos = []

let projects = [
    projectConstructor("Today", "To-Dos that are due today.", undefined, undefined, undefined),
    projectConstructor("7 Days", "To-Dos that are due in 7 days.", undefined, undefined, undefined),
    projectConstructor("29 Days", "To-Dos that are due in 30 days.", undefined, undefined, undefined),
    projectConstructor("29+ Days", "To-Dos that are due after 30 days.", undefined, undefined, undefined),
    projectConstructor("Misc", "Miscellaneous todos", undefined, undefined, undefined),
]

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
    return {title, desc, datedue, priority}
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

const formfuncs = (() => {

    function renameTodoOrProject(e) {
        e.originalTarget
    }

    // Function that returns the form for the user to fill out to make a todo
    function createForm(projectstatus) {
        let formshell = document.createElement("form")
        formshell.id = "todoform"

        let names = [
            "title", 
            "desc", 
            "date", 
            "date", 
            "pickdate",
            "picktime", 
            "important"
        ]

        let types = [
            "text",
            "text",
            "radio",
            "radio",
            "date",
            "time",
            "checkbox",
            "button",
            "button"
        ]

        let textlabels = [
            "Enter The Name", 
            "To-Do Description", 
            "Whenever", 
            "Specific date", 
            "Pick a date",
            "Pick a time",
            "Important?",
            "Close",
            "Create"
        ]

        if (projectstatus === true) {
            textlabels[1] = "Project Description"
        }

        // For loop to place the information onto the elements and append them
        for(let i = 0; i < types.length; i++) {
            if(i < (types.length - 2)) {
                let tempinput = document.createElement("input")
                let templabel = document.createElement("label")
                tempinput.name = names[i]
                templabel.for = names[i]
                templabel.textContent = textlabels[i]
                tempinput.type = types[i]

                if(i == 2) {
                    let paragraph = document.createElement("p")
                    if(projectstatus) {
                        paragraph.textContent = "when does the project need finishing?"
                    } else {
                        paragraph.textContent = "when does the to-do need finishing?"
                    }
                    tempinput.checked = true
                    formshell.appendChild(paragraph)
                }

                if(i > 1 && i < 4) {
                    tempinput.label = textlabels[i]
                    tempinput.addEventListener("change", e => {
                        let elementlabel = e.originalTarget.label
                        radioChange(elementlabel)
                    })
                    formshell.appendChild(tempinput)
                    formshell.appendChild(templabel)
                } else if(i == 4) {
                    tempinput.id = "dateinput"
                    templabel.id = "datelabel"
                    tempinput.min = format(new Date(), "yyyy-MM-dd")
                    tempinput.style.display = "none"
                    templabel.style.display = "none"
                    formshell.appendChild(templabel)
                    formshell.appendChild(tempinput)
                } else if (i == 5) {
                    tempinput.id = "timeinput"
                    templabel.id = "timelabel"
                    tempinput.min = format(new Date(), "hh:mm")
                    tempinput.style.display = "none"
                    templabel.style.display = "none"
                    formshell.appendChild(templabel)
                    formshell.appendChild(tempinput)
                } else {  
                    formshell.appendChild(templabel)
                    formshell.appendChild(tempinput)
                }

            } else {
                let tempbutton = document.createElement("button")
                tempbutton.type = types[i]
                tempbutton.textContent = textlabels[i]
                formshell.appendChild(tempbutton)
            }
        }

        return formshell
    }

    function radioChange(elementlabel) {
        let dateinput = document.querySelector("#dateinput")
        let datelabel = document.querySelector("#datelabel")
        let timeinput = document.querySelector("#timeinput")
        let timelabel = document.querySelector("#timelabel")
        if (elementlabel == "Whenever") {
            dateinput.style.display = "none"
            datelabel.style.display = "none"
            timeinput.style.display = "none"
            timelabel.style.display = "none"
        } else {
            dateinput.style.display = "block"
            datelabel.style.display = "block"
            timeinput.style.display = "block"
            timelabel.style.display = "block"
        }
    }

    function destroyForm(e) {
        e.srcElement.parentNode.remove()
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
            projects[projectstatus].todos.push(todo)
            todos.push(todo)
            todoSorter()
            projectfuncs.makeProjectSpace(projectstatus)
        }
    }
    
    function addFormBtnListeners(form, projectstatus) {
        form[form.length - 2].addEventListener("click", e => {
            destroyForm(e)
        })
        form[form.length - 1].addEventListener("click", e => {
            if (form[0].value == "") {
                return
            }
            let index = document.querySelector("#todos").currentNumber
            makeTodo(projectstatus, form)
            projectfuncs.appendProjects()
            destroyForm(e)
            if (index === undefined) {
                return
            }
            projectfuncs.makeProjectSpace(index)
        })
    }

    // checks if there is already a form there and removes it if so
    function checkForm() {
        let form = document.querySelector("#todoform")
        if (form == undefined) {
            return
        } else {
            form.remove()
        }
    }
    
    function appendForm(projectstatus) {
        let mainarea = document.querySelector("#content")
        let form = createForm(projectstatus)
        form.id = "todoform"
        checkForm()
        addFormBtnListeners(form, projectstatus)
        mainarea.appendChild(form)
    }

    return {appendForm, todoSorter}
})()

const projectfuncs = (() => {
    function addBtnToProject(index) {
        let addtodobtn = document.createElement("button")
        addtodobtn.textContent = "Add To-Do to Project"
        addtodobtn.addEventListener("click", () => {
            formfuncs.appendForm(index)
        })
        return addtodobtn
    }

    function makeProjectSpace(index) {
        let todos = projects[index].todos
        let projecttodosarea = document.querySelector("#todos")
        let compiledtodos = compileArray(todos)
        console.log(compiledtodos)
        projecttodosarea.currentNumber = index
        projecttodosarea.innerHTML = ""
        if (index > 4) {
            projecttodosarea.appendChild(addBtnToProject(index))
        }
        for (let i = 0; i < compiledtodos.length; i++) {
            compiledtodos[i].addEventListener("click", e => {
                let projectnum = e.originalTarget.parentElement.currentNumber
                let todonum = e.originalTarget.number
                // projects[projectnum].todos[todonum]
            })
            projecttodosarea.appendChild(compiledtodos[i])
        }

    }
    
    // compiles all elements in an array into a div
    function compileArray(array) {
        let compiledArray = []
        
        for (let i = 0; i < array.length; i++) {
            let element = document.createElement("div")
            element.textContent = array[i].title
            element.number = i
            compiledArray.push(element)
        }
    
        return compiledArray
    }
    
    function addListenToDivs(divs) {
        for (let i = 0; i < divs.length; i++) {
            divs[i].addEventListener("click", e => {
                let index = e.srcElement.number
                makeProjectSpace(index)
            })
        }
    }
    
    function appendProjects() {
        let projectsarea = document.querySelector("#projectsarea")
        let projectarr = compileArray(projects)
        projectsarea.innerHTML = ""
        addListenToDivs(projectarr)
        for (let i = 0; i < projectarr.length; i++) {
            projectsarea.appendChild(projectarr[i])
        }
    }

    return { appendProjects, makeProjectSpace }

})()

let appendForm = formfuncs.appendForm
let appendProjects = projectfuncs.appendProjects

export { appendForm, appendProjects }