let todos = []
let projects = [
    projectConstructor("Today", "To-Dos that are due today.", undefined, undefined),
    projectConstructor("7 Days", "To-Dos that are due in 7 days.", undefined, undefined),
    projectConstructor("30 Days", "To-Dos that are due in 30 days.", undefined, undefined),
    projectConstructor("Later", "To-Dos that are due after 30 days.", undefined, undefined),
    projectConstructor("funnyman dice", "make some funnymen dice.", new Date(), true)
]

function todoConstructor(title, desc, datedue, priority) {
    return {title, desc, datedue, priority}
}

function projectConstructor(title, desc, datedue, priority, number) {
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
        if (elementlabel == "Whenever") {
            dateinput.style.display = "none"
            datelabel.style.display = "none"
        } else {
            dateinput.style.display = "block"
            datelabel.style.display = "block"
        }
    }

    function destroyForm(e) {
        e.srcElement.parentNode.remove()
    }
    
    function makeTodo(projectstatus) {
        let form = document.querySelector("#todoform")
        if(projectstatus === true) {
            projects.push(projectConstructor(form[0].value, form[1].value, form[4].value, form[5].checked))
            console.log("hello")
        } else if (projectstatus === false) {
            todos.push(todoConstructor(form[0].value, form[1].value, form[4].value, form[5].checked))
            console.log("hello2")
        } else {
            projects[projectstatus].todos.push(todoConstructor(form[0].value, form[1].value, form[4].value, form[5].checked))
            projectfuncs.makeProjectSpace(projectstatus)
        }
    }
    
    function addFormBtnListeners(form, projectstatus) {
        form[6].addEventListener("click", e => {
            destroyForm(e)
        })
        form[7].addEventListener("click", e => {
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