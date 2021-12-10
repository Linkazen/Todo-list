let todos = []

function todoConstructor(title, desc, datedue, priority) {
    return {title, desc, datedue, priority}
}

function createTodoForm() {
    let formshell = document.querySelector("form")

    let names = ["title", "desc", "nodate", "enterdate", "picktime", "important"]
    let inputs = []
    let labels = []

    console.log(names.length)

    for(let i = 0; i < names.length; i++) {
        let tempdiv = document.createElement("input")
        tempdiv.name = names[i]
        inputs.push(tempdiv)
    }
    
    for(let i = 0; i < names.length; i++) {
        let tempdiv = document.createElement("label")
        tempdiv.for = names[i]
        labels.push(tempdiv)
    }

    for(let i = 0; i < names.length; i++) {
        let label = labels[i]
        let input = inputs[i]
        let paragraph = document.createElement("p")
        paragraph.textContent = "when does the to-do need finishing?"
        
        if(i == 2) {
            formshell.appendChild(paragraph)
            console.log("hello")
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
    console.log(createTodoForm())
}

export { test }