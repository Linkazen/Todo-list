import { appendForm, appendProjects } from "./modules/constructfunctions";

let todobtn = document.querySelector("#todobtn")
let probtn = document.querySelector("#probtn")
let projectbtn = document.querySelector("#projectsbtn")

todobtn.addEventListener("click", () => {
    appendForm(false)
})
probtn.addEventListener("click", () => {
    appendForm(true)
})