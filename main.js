const choices = document.querySelectorAll(".choice > span")
choices.forEach(choice => {
    choice.addEventListener("click", (e)=>{
        choose(e.currentTarget)
    })
})

function choose(a) {
    choices.forEach(a => {a.classList.remove("active")})
    a.classList.add("active");
}