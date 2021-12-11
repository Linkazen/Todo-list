let todos = []
let projects = [
    projectConstructor("Today", "To-Dos that are due today.", undefined, undefined),
    projectConstructor("7 Days", "To-Dos that are due in 7 days.", undefined, undefined),
    projectConstructor("30 Days", "To-Dos that are due in 30 days.", undefined, undefined)
]

function todoConstructor(title, desc, datedue, priority) {
    return {title, desc, datedue, priority}
}

function projectConstructor(title, desc, datedue, priority) {
    let todos = []
    return {title, desc, datedue, priority, todos}
}

// compiles the projects together into a div
function showProjects() {
    let projectsDiv = document.createElement("div")
    
    for (let i = 0; i < projects.length; i++) {
        let project = document.createElement("div")
        project.textContent = projects[i].title
        projectsDiv.appendChild(project)
    }

    return projectsDiv
}

function appendProjects() {
    let projectsarea = document.querySelector("#projectsarea")
    projectsarea.innerHTML = ""
    projectsarea.appendChild(showProjects())
}

// Function that returns the form for the user to fill out to make a todo
function createForm(projectstatus) {
    let formshell = document.createElement("form")
    formshell.id = "todoform"

    let names = [
        "title", 
        "desc", 
        "nodate", 
        "enterdate", 
        "picktime", 
        "important"
    ]

    let types = [
        "text",
        "text",
        "radio",
        "radio",
        "datetime-local",
        "checkbox",
        "button",
        "button"
    ]

    let textlabels = [
        "Enter The Name", 
        "To-Do Description", 
        "Whenever", 
        "Specific date", 
        "Pick a date and time",
        "Important?",
        "Close",
        "Create"
    ]

    if (projectstatus == true) {
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
                formshell.appendChild(paragraph)
            }

            if(i < 2 || i > 3) {
                formshell.appendChild(templabel)
                formshell.appendChild(tempinput)
            } else {
                formshell.appendChild(tempinput)
                formshell.appendChild(templabel)
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

function addFormBtnListeners(form, projectstatus) {
    form[6].addEventListener("click", e => {
        destroyForm(e)
    })
    form[7].addEventListener("click", () => {
        makeTodo(projectstatus)
    })
}

function destroyForm(e) {
    e.srcElement.parentNode.remove()
}

function makeTodo(projectstatus) {
    let form = document.querySelector("#todoform")
    if(projectstatus) {
        projects.push(projectConstructor(form[0].value, form[1].value, form[4].value, form[5].checked))
    } else {
        todos.push(todoConstructor(form[0].value, form[1].value, form[4].value, form[5].checked))
    }
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

export { appendForm, appendProjects }