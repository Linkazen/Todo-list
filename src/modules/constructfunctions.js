let todos = []

function todoConstructor(title, desc, datedue, priority) {
    return {title, desc, datedue, priority}
}

// Function that returns the form for the user to fill out to make a todo
function createTodoForm() {
    let formshell = document.createElement("form")

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
        "Task Specifications", 
        "Whenever", 
        "Specific date", 
        "Pick a date and time",
        "Important?",
        "Close",
        "Create"
    ]

    // For loop to place the information onto the elements and append them
    for(let i = 0; i < types.length; i++) {
        if(i < 6) {
            let tempinput = document.createElement("input")
            let templabel = document.createElement("label")
            tempinput.name = names[i]
            templabel.for = names[i]
            templabel.textContent = textlabels[i]
            tempinput.type = types[i]
            
            if(i == 2) {
                let paragraph = document.createElement("p")
                paragraph.textContent = "when does the to-do need finishing?"
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

function appendForm() {
    let mainarea = document.querySelector("#content")
    mainarea.appendChild(createTodoForm())
}

export { appendForm }