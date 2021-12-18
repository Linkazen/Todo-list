import { format, add, isDate } from 'date-fns'

let todos = []
let projects = [
    projectConstructor("Today", "To-Dos that are due today.", undefined, undefined),
    projectConstructor("7 Days", "To-Dos that are due in 7 days.", undefined, undefined),
    projectConstructor("30 Days", "To-Dos that are due in 30 days.", undefined, undefined),
    projectConstructor("30+ Days", "To-Dos that are due after 30 days.", undefined, undefined),
    projectConstructor("Misc", "Miscellaneous todos", undefined, undefined),
    projectConstructor("funnyman dice", "make some funnymen dice.", new Date(), true)
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

function projectConstructor(title, desc, date, time, priority, number) {
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
    return {title, desc, datedue, priority, todos, number}
}

const formfuncs = (() => {

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
    
    function makeTodo(projectstatus) {
        let form = document.querySelector("#todoform")
        console.log(form)
        if(projectstatus === true) {
            projects.push(projectConstructor(form[0].value, form[1].value, form[4].value, form[5].value, form[6].checked))
        } else if (projectstatus === false) {
            let todo = todoConstructor(form[0].value, form[1].value, form[4].value, form[5].value, form[6].checked)
            todos.push()
        } else {
            projects[projectstatus].todos.push(todoConstructor(form[0].value, form[1].value, form[4].value, form[5].value, form[6].checked))
            projectfuncs.makeProjectSpace(projectstatus)
        }
    }
    
    function addFormBtnListeners(form, projectstatus) {
        form[form.length - 2].addEventListener("click", e => {
            destroyForm(e)
        })
        form[form.length - 1].addEventListener("click", e => {
            makeTodo(projectstatus)
            projectfuncs.appendProjects()
            destroyForm(e)
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
        checkForm()
        addFormBtnListeners(form, projectstatus)
        mainarea.appendChild(form)
    }

    return {appendForm}
})()

const projectfuncs = (() => {
    function makeProjectSpace(index) {
        let todos = projects[index].todos
        let projecttodosarea = document.querySelector("#projecttodos")
        let addtodobtn = document.createElement("button")
        addtodobtn.textContent = "Add To-Do to Project"
        addtodobtn.addEventListener("click", () => {
            formfuncs.appendForm(index)
        })
        projecttodosarea.innerHTML = ""
        projecttodosarea.appendChild(addtodobtn)
        projecttodosarea.appendChild(compileArray(todos))

    }
    
    // compiles all elements in an array into a div
    function compileArray(array) {
        let projectsDiv = document.createElement("div")
        
        for (let i = 0; i < array.length; i++) {
            let project = document.createElement("div")
            project.textContent = array[i].title
            project.number = i
            projectsDiv.appendChild(project)
        }
    
        return projectsDiv
    }
    
    function addListenToDivs(div) {
        for (let i = 0; i < div.children.length; i++) {
            div.children[i].addEventListener("click", e => {
                let index = e.srcElement.number
                makeProjectSpace(index)
            })
            
        }
    }
    
    function appendProjects() {
        let projectsarea = document.querySelector("#projectsarea")
        let projectdiv = compileArray(projects)
        projectsarea.innerHTML = ""
        addListenToDivs(projectdiv)
        projectsarea.appendChild(projectdiv)
    }

    return { appendProjects, makeProjectSpace }

})()

let appendForm = formfuncs.appendForm

export { appendForm }