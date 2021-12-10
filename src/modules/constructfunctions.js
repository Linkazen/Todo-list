let todos = []

function todoConstructor(title, desc, datedue, priority) {
    return {title, desc, datedue, priority}
}

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
        "checkbox"
    ]

    let textstuff = [
        "Enter The Name", 
        "task specifications", 
        "Whenever", 
        "Specific date", 
        "Pick a date and time",
        "Important?"
    ]

    let inputs = []
    let labels = []

    for(let i = 0; i < names.length; i++) {
        let tempinputdiv = document.createElement("input")
        let templabeldiv = document.createElement("label")
        tempinputdiv.name = names[i]
        templabeldiv.for = names[i]
        inputs.push(tempinputdiv)
        labels.push(templabeldiv)
    }

    for(let i = 0; i < names.length; i++) {
        let label = labels[i]
        let input = inputs[i]
        let paragraph = document.createElement("p")
        label.textContent = textstuff[i]
        input.type = types[i]
        paragraph.textContent = "when does the to-do need finishing?"
        
        if(i == 2) {
            formshell.appendChild(paragraph)
        }

        if(i < 2 || i > 3) {
            formshell.appendChild(input)
            formshell.appendChild(label)
        }
        formshell.appendChild(label)
        formshell.appendChild(input)
    }
    return formshell
}

function test() {
    let mainarea = document.querySelector("#content")
    mainarea.appendChild(createTodoForm())
}

export { test }