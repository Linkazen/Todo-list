import {format} from 'date-fns'
import { makeTodo, compileArray, returnProjectTodo, renameProTodo, todoSorter } from './TodoManip'

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
                } else if(i == 4 || i == 5) {
                    tempinput.className = "datetime"
                    templabel.className = "datetime"
                    tempinput.min = format(new Date(), "yyyy-MM-dd")
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
        let allElements = document.querySelectorAll(".datetime")
        if (elementlabel == "Whenever") {
            for (let i = 0; i < 4; i++) {
                allElements[i].style.display = "none"
            }
        } else {
            for (let i = 0; i < 4; i++) {
                allElements[i].style.display = "block"
            }
        }
    }

    function destroyForm(e) {
        e.srcElement.parentNode.remove()
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
        form[form.length - 2].addEventListener("click", e => {
            destroyForm(e)
        })
        form[form.length - 1].addEventListener("click", e => {
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
            domFuncs.makeProjectSpace(index)
        })
    }
    
    function appendForm(projectstatus) {
        let mainarea = document.querySelector("#content")
        let form = createForm(projectstatus)
        form.id = "todoform"
        checkForm()
        addFormBtnListeners(form, projectstatus)
        mainarea.appendChild(form)
    }

    return {appendForm}
})()



const domFuncs = (() => {
    function addBtnToProject(index) {
        let addtodobtn = document.createElement("button")
        addtodobtn.textContent = "Add To-Do to Project"
        addtodobtn.addEventListener("click", () => {
            formfuncs.appendForm(index)
        })
        return addtodobtn
    }

    function returnTodoElements(todo) {
        let array = []
        let doc1 = document.createElement("h1")
        let doc2 = document.createElement("p")
        let doc3 = document.createElement("p")
        doc1.textContent = `${todo.title}`
        doc2.textContent = `${todo.desc}`
        try {
            doc3.textContent = `${format(todo.datedue, "yyyy/MM/dd hh:mm")}`
        }
        catch {
            doc3.textContent = `Whenever`
        }
        array.push(doc1)
        array.push(doc2)
        array.push(doc3)
        return array
    }
    
    function addListenToDivs(divs) {
        for (let i = 0; i < divs.length; i++) {
            divs[i].addEventListener("click", e => {
                let index = e.srcElement.number
                makeProjectSpace(index)
            })
        }
    }

    function makeProjectSpace(index) {
        let projecttodosarea = document.querySelector("#todos")
        let compiledtodos = compileArray(index)
        projecttodosarea.currentNumber = index
        projecttodosarea.innerHTML = ""
        if (index > 4) {
            projecttodosarea.appendChild(addBtnToProject(index))
        }
        for (let i = 0; i < compiledtodos.length; i++) {
            compiledtodos[i].addEventListener("click", e => {
                let todoinfo = document.querySelector("#todoinfo")
                let protodonum = e.originalTarget.number
                let pronum = e.originalTarget.parentElement.currentNumber
                let todo = returnProjectTodo(pronum, protodonum)
                let todonum = e.originalTarget.todoNum
                console.log("test1")
                let tododivs = returnTodoElements(todo)
                console.log("test2")
                let origpronum = todo.projectnum
                
                let renamebtn = document.createElement("button")
                renamebtn.addEventListener("click", function() {
                    renameProTodo("renametest", origpronum, protodonum, todonum)
                    todoSorter()
                    appendProjects()
                })
                renamebtn.textContent = "rename"
                tododivs.push(renamebtn)

                /*let deletebtn = document.createElement("button")
                deletebtn.addEventListener("click", function() {
                    deleteProTodo(todo, todonum, "renametest")
                })
                deletebtn.textContent = "delete"
                tododivs.push(deletebtn)*/

                todoinfo.innerHTML = ""
                for (let t = 0; t < tododivs.length; t++) {
                    todoinfo.appendChild(tododivs[t])
                }
            })
            projecttodosarea.appendChild(compiledtodos[i])
        }
    
    }
    
    function appendProjects() {
        let projectsarea = document.querySelector("#projectsarea")
        let projectarr = compileArray("projects")
        projectsarea.innerHTML = ""
        addListenToDivs(projectarr)
        for (let i = 0; i < projectarr.length; i++) {
            projectsarea.appendChild(projectarr[i])
        }
    }

    return { appendProjects, makeProjectSpace }

})()

let appendForm = formfuncs.appendForm
let appendProjects = domFuncs.appendProjects

export { appendForm, appendProjects }