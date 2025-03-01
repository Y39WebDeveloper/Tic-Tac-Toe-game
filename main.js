const menu = document.getElementById("menu")
const board = document.getElementById("board")
const result = document.getElementById("result")
const cases = document.querySelectorAll(".board .body .case")


if(sessionStorage.layerIndex == undefined){
    sessionStorage.setItem("layerIndex",0)
}

const layers = [menu, board, result]
function setLayer(layers){
    for(let i = 0; i < layers.length; i++){
        layers[i].classList.remove("show")
        layers[sessionStorage.layerIndex].classList.add("show")
    }
}
setLayer(layers)



const choices = document.querySelectorAll(".choice > span")
choices.forEach(choice => {
    choose(choice)
})
choices.forEach(choice => {
    choice.addEventListener("click", (e)=>{
        choose(e.currentTarget)
    })
})


function choose(a) {
    sessionStorage.setItem("player1", a.dataset.value)
    if(a.dataset.value == sessionStorage.player1){
        choices.forEach(c => c.classList.remove("active"))
        a.classList.add("active")
    }
}


const solo = document.getElementById("solo")
const multi = document.getElementById("multi")

multi.addEventListener("click", () => {
    cases.forEach(cas=>{
        cas.style.backgroundImage = "url('assets/icon-x-outline.svg')"
        cas.classList.add("empty")
        cas.dataset.value = "";
    })
    sessionStorage.setItem("layerIndex", 1)
    setLayer(layers)
    sessionStorage.setItem("currentPlayer", "x")
    let a = ["","","","","","","","",""]
    sessionStorage.caseValue = JSON.stringify(a)
})

for (let i = 0; i < cases.length; i++) {
    const cas = cases[i];
    if(JSON.parse(sessionStorage.caseValue)[i]=="x"){
        cas.style.backgroundImage = "url('assets/icon-x.svg')";
        cas.dataset.value = "x";
        cas.classList.add("active")
    }else if(JSON.parse(sessionStorage.caseValue)[i] == "o"){
        cas.style.backgroundImage = "url('assets/icon-o.svg')";
        cas.dataset.value = "o";
        cas.classList.remove("empty")
    }else{
        cas.classList.add("empty")
        if(sessionStorage.currentPlayer=="x"){
            cas.style.backgroundImage = "url('assets/icon-x-outline.svg')";
        }else{
            cas.style.backgroundImage = "url('assets/icon-o-outline.svg')";
        }
    }
    cas.addEventListener("click", (e) => {
        if(e.currentTarget.dataset.value!="x" && e.currentTarget.dataset.value!="o"){
            if(sessionStorage.currentPlayer == "x"){
                e.currentTarget.dataset.value = "x";
                cas.classList.remove("empty")
                sessionStorage.setItem("currentPlayer", "o")
                cases.forEach(cas=>{
                    if(cas.dataset.value != "o" && cas.dataset.value !="x"){
                        cas.style.backgroundImage = "url('assets/icon-o-outline.svg')"
                        cas.classList.add("empty")
                    }
                })
            }else{
                e.currentTarget.dataset.value = "o";
                cas.classList.remove("empty")
                sessionStorage.setItem("currentPlayer", "x")
                cases.forEach(cas=>{
                    if(cas.dataset.value != "o" && cas.dataset.value !="x"){
                        cas.style.backgroundImage = "url('assets/icon-x-outline.svg')"
                        cas.classList.add("empty")
                    }
                })
            }
        }
        let a = JSON.parse(sessionStorage.caseValue)
        a[i] = e.currentTarget.dataset.value
        if(a[i]=="x"){
            e.currentTarget.style.backgroundImage = "url('assets/icon-x.svg')";
        }else if(a[i] == "o"){
            e.currentTarget.style.backgroundImage = "url('assets/icon-o.svg')";
        }
        console.log(a)
        sessionStorage.caseValue = JSON.stringify(a)
        console.log(sessionStorage.caseValue)
        console.log(e.currentTarget)
    })
    
}

let restart = document.getElementById("restart")
restart.addEventListener("click", () => {
    sessionStorage.setItem("layerIndex",0)
    setLayer(layers)
})