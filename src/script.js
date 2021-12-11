import { appendForm } from "./modules/constructfunctions";

let todobtn = document.querySelector("#todobtn")
let probtn = document.querySelector("#probtn")

todobtn.addEventListener("click", () => {
    appendForm(false)
})
probtn.addEventListener("click", () => {
    appendForm(true)
})