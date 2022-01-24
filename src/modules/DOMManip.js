import {format} from 'date-fns'
import { 
    makeTodo, 
    compileArray, 
    renameTodo, 
    deleteTodo, 
    todoSorter, 
    saveArrs, 
    deleteProject,
    returnProjectTodoNum,
    returnTodo,
    returnProject,
    changeDate,
    changeDesc
} from './TodoManip'
import {todoCon, projectCon} from './Constructors'

function destroyForm(e) {
    e.srcElement.parentNode.remove()
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
            "important"
        ]

        let types = [
            "text",
            "text",
            "radio",
            "radio",
            "date",
            "checkbox",
            "button",
            "button"
        ]

        let textlabels = [
            "Enter The Name:", 
            "To-Do Description:", 
            "Whenever", 
            "Specific date", 
            "Pick a date:",
            "Important?",
            "Create",
            "Close"
        ]

        if (projectstatus === true) {
            textlabels[1] = "Project Description"
        }

        // For loop to place the information onto the elements and append them
        for(let i = 0; i < types.length; i++) {
            if (projectstatus === true && i < 6 && i > 1) {
                continue
            }
            if(i < (types.length - 2)) {
                let tempinput = document.createElement("input")
                let templabel = document.createElement("label")
                if (i == 1) {
                    tempinput = document.createElement("textarea")
                }
                tempinput.name = names[i]
                templabel.for = names[i]
                templabel.textContent = textlabels[i]
                if (i != 1) {
                    tempinput.type = types[i]
                }

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
                    templabel.appendChild(tempinput)
                    formshell.appendChild(templabel)
                } else if(i == 4) {
                    tempinput.min = format(new Date(), "yyyy-MM-dd")
                    templabel.className = "datetime"
                    templabel.style.display = "none"
                    templabel.appendChild(tempinput)
                    formshell.appendChild(templabel)
                } else {  
                    templabel.appendChild(tempinput)
                    formshell.appendChild(templabel)
                }

            } else {
                let tempbutton = document.createElement("button")
                tempbutton.type = types[i]
                tempbutton.textContent = textlabels[i]
                formshell.appendChild(tempbutton)
            }
        }

        formshell.onkeydown="return event.key != 'Enter';"

        return formshell
    }

    function radioChange(elementlabel) {
        let allElements = document.querySelectorAll(".datetime")
        if (elementlabel == "Whenever") {
            for (let i = 0; i < allElements.length; i++) {
                allElements[i].style.display = "none"
            }
        } else {
            for (let i = 0; i < allElements.length; i++) {
                allElements[i].style.display = "block"
            }
        }
    }
    
    function destroyTodoInfo() {
        let todoinfo = document.querySelector("#todoinfo")
        todoinfo.innerHTML = ""
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

    function addFormBtnListeners(form, projectstatus) {
        form[form.length - 1].addEventListener("click", e => {
            destroyForm(e)
        })
        form[form.length - 2].addEventListener("click", e => {
            if (form[0].value == "") {
                return
            }
            let index = document.querySelector("#todos").currentNumber
            makeTodo(projectstatus, form)
            domFuncs.appendProjects()
            destroyForm(e)
            if (index === undefined) {
                return
            }
            domFuncs.appendProTodos(index)
        })
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



const domFuncs = (() => {
    function confirmDateChange(e, todonum, pronum) {
        let newDate = e.originalTarget.parentElement[0].value
        let divNum = returnProjectTodoNum(todonum, pronum)
        changeDate(todonum, newDate)
        appendProjects()
        let projectsplace = document.querySelector("#projectsarea").children
        projectsplace[pronum].click()
        let todoSpace = document.querySelector("#todos").children 
        if (pronum > 5) {
            todoSpace[divNum + 1].click()
        } else {
            todoSpace[divNum].click()
        }
        saveArrs()
    }

    function makeDateForm(todonum, pronum) {
        try {
            let previousForm = document.querySelector("#renameform")
            previousForm.innerHTML = ""
        }
        catch {
            
        }
        let form = document.createElement("form")
        form.id = "renameform"

        let label = document.createElement("label")
        label.textContent = "New Date"
        label.for = "newdate"

        let text = document.createElement("input")
        text.type = "date"
        text.name = "newdate"
        
        let confbtn = document.createElement("button")
        confbtn.textContent = "confirm"
        confbtn.type = "button"
        confbtn.addEventListener("click", function(e) {
            confirmDateChange(e, todonum, pronum)
            destroyForm(e)
            todoSorter()
            appendProjects()
            appendProTodos(pronum)
        })

        let cnclbtn = document.createElement("button")
        cnclbtn.textContent = "cancel"
        cnclbtn.type = "button"
        cnclbtn.addEventListener("click", function(e) {
            destroyForm(e)
        })
        
        label.appendChild(text)
        form.appendChild(label)
        form.appendChild(confbtn)
        form.appendChild(cnclbtn)
        return form
    }

    function confirmDescChange(e, todonum, pronum) {
        let newDate = e.originalTarget.parentElement[0].value
        let divNum = returnProjectTodoNum(todonum, pronum)
        changeDesc(todonum, newDate)
        appendProjects()
        let projectsplace = document.querySelector("#projectsarea").children
        projectsplace[pronum].click()
        let todoSpace = document.querySelector("#todos").children 
        if (pronum > 5) {
            todoSpace[divNum + 1].click()
        } else {
            todoSpace[divNum].click()
        }
        saveArrs()
    }

    function makeDescForm(todonum, pronum) {
        let form = document.createElement("form")
        form.id = "renameform"

        let label = document.createElement("label")
        label.textContent = "New Desc"
        label.for = "newdesc"

        let text = document.createElement("input")
        text.type = "text"
        text.name = "newdesc"
        
        let confbtn = document.createElement("button")
        confbtn.textContent = "confirm"
        confbtn.type = "button"
        confbtn.addEventListener("click", function(e) {
            confirmDescChange(e, todonum, pronum)
            destroyForm(e)
            todoSorter()
            appendProjects()
            appendProTodos(pronum)
        })

        let cnclbtn = document.createElement("button")
        cnclbtn.textContent = "cancel"
        cnclbtn.type = "button"
        cnclbtn.addEventListener("click", function(e) {
            destroyForm(e)
        })
        
        label.appendChild(text)
        form.appendChild(label)
        form.appendChild(confbtn)
        form.appendChild(cnclbtn)
        return form
    }

    function returnInfoElements(info, proStatus, todonum, pronum) {
        let array = []
        let doc1 = document.createElement("h1")
        let doc2 = document.createElement("div")
        let doc3 = document.createElement("div")
        let mainarea = document.querySelector("#content")
        doc1.textContent = `${info.getTitle()}`
        doc2.textContent = `${info.getDesc()}`
        if (proStatus === false) {
            doc2.addEventListener("click", function (e) {
                let previousForm = document.querySelector("#renameform")
                if (previousForm != null) {
                    previousForm.remove()
                }
                mainarea.appendChild(makeDescForm(todonum, pronum))
            })
            try {
                doc3.textContent = `${format(info.getDatedue(), "dd/MM/yyyy")}`
                doc3.addEventListener("click", function(e) {
                    let previousForm = document.querySelector("#renameform")
                    if (previousForm != null) {
                        previousForm.remove()
                    }
                    mainarea.appendChild(makeDateForm(todonum, pronum))
                })
            }
            catch {
                doc3.textContent = `No Date Entered`
                doc3.addEventListener("click", function(e) {
                    let previousForm = document.querySelector("#renameform")
                    if (previousForm != null) {
                        previousForm.remove()
                    }
                    mainarea.appendChild(makeDateForm(todonum, pronum))
                })
            }
        }
        array.push(doc1)
        array.push(doc2)
        array.push(doc3)
        return array
    }

    function confirmRename(e, todonum, pronum) {
        let newName = e.originalTarget.parentElement[0].value
        let divNum = returnProjectTodoNum(todonum, pronum)
        renameTodo(todonum, newName)
        appendProjects()
        let projectsplace = document.querySelector("#projectsarea").children
        projectsplace[pronum].click()
        let todoSpace = document.querySelector("#todos").children
        if (pronum > 5) {
            todoSpace[divNum + 1].click()
        } else {
            todoSpace[divNum].click()
        }
        saveArrs()
    }

    function makeRenameForm(todonum, pronum) {
        try {
            let previousForm = document.querySelector("#renameform")
            previousForm.innerHTML = ""
        }
        catch {
            
        }
        let form = document.createElement("form")
        form.id = "renameform"

        let label = document.createElement("label")
        label.textContent = "Rename Todo?"
        label.for = "rename"

        let text = document.createElement("input")
        text.type = "text"
        text.name = "rename"
        
        let confbtn = document.createElement("button")
        confbtn.textContent = "confirm"
        confbtn.type = "button"
        confbtn.addEventListener("click", function(e) {
            confirmRename(e, todonum, pronum)
            destroyForm(e)
        })

        let cnclbtn = document.createElement("button")
        cnclbtn.textContent = "cancel"
        cnclbtn.type = "button"
        cnclbtn.addEventListener("click", function(e) {
            destroyForm(e)
        })
        
        label.appendChild(text)
        form.appendChild(label)
        form.appendChild(confbtn)
        form.appendChild(cnclbtn)
        return form
    }

    function todoInfoCreate(e) {
        let todoinfo = document.querySelector("#todoinfo")
        let todonum = e.originalTarget.number
        let pronum = e.originalTarget.parentElement.currentNumber
        let todo = returnTodo(todonum)
        let tododivs = returnInfoElements(todo, false, todonum, pronum)
        let btndiv = document.createElement("div")
        btndiv.className = "probtns"
        
        let renamebtn = document.createElement("button")
        renamebtn.addEventListener("click", function(e) {
            let previousForm = document.querySelector("#renameform")
            if (previousForm != null) {
                previousForm.remove()
            }
            let mainarea = document.querySelector("#content")
            mainarea.appendChild(makeRenameForm(todonum, pronum))
        })
        renamebtn.textContent = "rename"
        btndiv.appendChild(renamebtn)

        let deletebtn = document.createElement("button")
        deletebtn.addEventListener("click", function() {
            deleteTodo(todonum)
            todoSorter()
            appendProjects()
            let projects = document.querySelector("#projectsarea").children
            projects[pronum].click()
            todoinfo.innerHTML = ""
            saveArrs()
        })
        deletebtn.textContent = "delete"
        btndiv.appendChild(deletebtn)
        tododivs.push(btndiv)

        todoinfo.innerHTML = ""
        for (let t = 0; t < tododivs.length; t++) {
            todoinfo.appendChild(tododivs[t])
        }
    }

    function appendProTodos(index) {
        let projecttodosarea = document.querySelector("#todos")
        let compiledtodos = compileArray(index)
        projecttodosarea.currentNumber = index
        projecttodosarea.innerHTML = ""
        if (index > 5) {
            projecttodosarea.appendChild(addBtnsToProject(index))
        } else {
            let cssDiv = document.createElement("span")
            projecttodosarea.appendChild(cssDiv)
        }
        for (let i = 0; i < compiledtodos.length; i++) {
            compiledtodos[i].addEventListener("click", e => {
                todoInfoCreate(e)
            })
            projecttodosarea.appendChild(compiledtodos[i])
        }
    }

    function addBtnsToProject(projectNum) {
        let buttonsspan = document.createElement("span")
        buttonsspan.className = "probtns"

        let addtodobtn = document.createElement("button")
        addtodobtn.textContent = "Add To-Do to Project"
        addtodobtn.addEventListener("click", () => {
            formfuncs.appendForm(projectNum)
        })
        buttonsspan.appendChild(addtodobtn)

        let deletebtn = document.createElement("button")
        deletebtn.textContent = "Delete Project"
        deletebtn.addEventListener("click", e => {
            deleteProject(projectNum)
            todoSorter()
            appendProjects()
            let todosspace = document.querySelector("#todos")
            let todoinfo = document.querySelector("#todoinfo")
            todosspace.innerHTML = ""
            todoinfo.innerHTML = ""
        })
        buttonsspan.appendChild(deletebtn)

        return buttonsspan
    }

    function projectInfoCreate(index) {
        let infospace = document.querySelector("#todoinfo")
        let project = returnProject(index)
        let divs = returnInfoElements(project, true)
        infospace.innerHTML = ""
        for (let i = 0; i < divs.length; i++) {
            infospace.appendChild(divs[i])
        }
    }

    function addListenToDivs(divs) {
        for (let i = 0; i < divs.length - 1; i++) {
            divs[i].addEventListener("click", e => {
                let index = divs[i].number
                appendProTodos(index)
                projectInfoCreate(index)
            })
        }
    }
    
    function appendProjects() {
        let projectsarea = document.querySelector("#projectsarea")
        let projectarr = compileArray("projects")
        let seperator = document.createElement("p")
        seperator.textContent = "Project Todos"
        projectarr.push(seperator)
        projectsarea.innerHTML = ""
        addListenToDivs(projectarr)
        for (let i = 0; i < projectarr.length; i++) {
            if (i > 5 && projectarr[i] != projectarr.at(-1)) {
                projectarr[i].style.order = "2"
            }
            projectsarea.appendChild(projectarr[i])
        }
    }

    return {appendProjects, appendProTodos}

})()

let appendForm = formfuncs.appendForm
let appendProjects = domFuncs.appendProjects

export { appendForm, appendProjects }