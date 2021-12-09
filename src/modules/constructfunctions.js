let todos = []

function todoConstructor(title, desc, datedue, priority) {
    return {title, desc, datedue, priority}
}

function createTodoForm() {
    let formshell = document.querySelector("form")

    let names = ["title", "desc", "nodate", "enterdate", "picktime", "important"]
    let inputs = []
    let labels = []

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

    
}