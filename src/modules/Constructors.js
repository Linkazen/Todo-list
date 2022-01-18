const todoCon = () => {
    let todoObj = {
        title:"",
        desc:"",
        date:"",
        priority:""
    }

    const setTitle = (newTitle) => {
        todoObj.title = newTitle
    }

    const getTitle = () => {
        return todoObj.title
    }

    const setDesc = (newDesc) => {
        todoObj.desc = newDesc
    }

    const getDesc = () => {
        return todoObj.desc
    }

    const setDatedue = (newDate, newTime) => {
        todoObj.date = new Date(`${newDate}T${newTime}`)
    }

    const getDatedue = () => {
        return todoObj.date
    }

    const setPriority = (newPriority) => {
        todoObj.priority = newPriority
    }

    const getPriority = () => {
        return todoObj.priority
    }

    const quickMake = (title, desc, date, time, priority) => {
        setTitle(title)
        setDesc(desc)
        setDatedue(date, time)
        setPriority(priority)
    }

    return {
        setTitle, getTitle,
        setDesc, getDesc,
        setDatedue, getDatedue,
        setPriority, getPriority,
        quickMake, todoObj
    }
}

const projectCon = () => {
    
    let proObj = {
        title:"",
        desc:"",
        pronum:"",
        todos:[]
    }

    const setTitle = (newTitle) => {
        proObj.title = newTitle
    }

    const getTitle = () => {
        return proObj.title
    }

    const setDesc = (newDesc) => {
        proObj.desc = newDesc
    }

    const getDesc = () => {
        return proObj.desc
    }

    const addTodo = (todo) => {
        proObj.todos.push(todo)
    }

    const setTodoList = (todolist) => {
        proObj.todos = todolist
    }

    const emptyTodos = () => {
        proObj.todos = []
    }

    const getTodos = () => {
        return proObj.todos
    }

    const quickMake = (title, desc) => {
        setTitle(title)
        setDesc(desc)
    }

    return {
        setTitle, getTitle,
        setDesc, getDesc,
        addTodo, setTodoList, emptyTodos, getTodos,
        quickMake, proObj
    }
}

export {
    todoCon,
    projectCon
}