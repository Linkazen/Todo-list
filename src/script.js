import './style.css'
import {todoCon, projectCon} from './modules/Constructors'
import {appendForm, appendProjects} from './modules/DOMManip'

let todobtn = document.querySelector("#todobtn")
let probtn = document.querySelector("#probtn")
let projectbtn = document.querySelector("#projectsbtn")

todobtn.addEventListener("click", () => {
    appendForm(false)
})

probtn.addEventListener("click", () => {
    appendForm(true)
})

appendProjects()