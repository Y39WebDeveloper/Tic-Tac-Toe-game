const menu = document.getElementById("menu")
const board = document.getElementById("board")
const result = document.getElementById("result")
const cases = document.querySelectorAll(".board .body .case")

const xScore = document.getElementById("xScore")
const oScore = document.getElementById("oScore")
const ties = document.getElementById("ties")
const winMessage = document.getElementById("winMessage")


function setScore(){
    xScore.innerHTML = sessionStorage.xScore ? sessionStorage.xScore : 0
    oScore.innerHTML = sessionStorage.oScore ? sessionStorage.oScore : 0
    ties.innerHTML = sessionStorage.ties ? sessionStorage.ties : 0
}
setScore()

function setWinState(){
    sessionStorage.winState = undefined ? "false" : sessionStorage.winState
    if(sessionStorage.winState == "true"){
        result.classList.add("show")
        setWinMessage()
    }else{
        result.classList.remove("show")
    }
}
setWinState()
function setWinMessage(){
    sessionStorage.winMessage = undefined ? "oWin" : sessionStorage.winMessage
    if(sessionStorage.winMessage == "oWin"){
        winMessage.innerHTML = "<p>PLAYER 1 WINS!</p>"
        winMessage.innerHTML += "<h2 style='color:#F2B137'><img src='assets/icon-o.svg' alt='' />TAKES THE ROUND</h2>"
    }else if(sessionStorage.winMessage == "xWin"){
        winMessage.innerHTML = "<p>PLAYER 2 WINS!</p>"
        winMessage.innerHTML += "<h2 style='color:#31C3BD'><img src='assets/icon-x.svg' alt='' />TAKES THE ROUND</h2>"
    }else{
        winMessage.innerHTML = "<h2 style='color:#A8BFC9'>ROUND TIED</h2>"
    }
}

if(sessionStorage.layerIndex == undefined){
    sessionStorage.setItem("layerIndex",0)
}
if(sessionStorage.caseValue == undefined){
    let a = ["","","","","","","","",""]
    sessionStorage.caseValue = JSON.stringify(a)
}
function setTurnTxt(){
    if(sessionStorage.currentPlayer == "o"){
        document.querySelector(".turn span img").src = "assets/icon-o-2.svg";
    }else{
        document.querySelector(".turn span img").src = "assets/icon-x-2.svg";
    }
}
setTurnTxt()

const layers = [menu, board]
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
        if(sessionStorage.currentPlayer == "o"){
            cas.style.backgroundImage = "assets/icon-o-outline.svg";
        }else{
            cas.style.backgroundImage = "assets/icon-x-outline.svg";
        }
        cas.classList.add("empty")
        cas.dataset.value = "";
    })
    sessionStorage.setItem("layerIndex", 1)
    setLayer(layers)
    sessionStorage.setItem("currentPlayer", "x")
    let a = ["","","","","","","","",""]
    sessionStorage.caseValue = JSON.stringify(a)
    sessionStorage.setItem("xScore", 0)
    sessionStorage.setItem("oScore", 0)
    sessionStorage.setItem("ties", 0)
    setTurnTxt()
    setScore()
    setBg()
})

for (let i = 0; i < cases.length; i++) {
    const cas = cases[i];
    setBg()
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
        setTurnTxt()
        let a = JSON.parse(sessionStorage.caseValue)
        a[i] = e.currentTarget.dataset.value
        if(a[i]=="x"){
            e.currentTarget.style.backgroundImage = "url('assets/icon-x.svg')";
        }else if(a[i] == "o"){
            e.currentTarget.style.backgroundImage = "url('assets/icon-o.svg')";
        }
        console.log(sessionStorage.caseValue)
        console.log(e.currentTarget)
        console.log(a)
        
        if(
            (check(a,[0,1,2])) 
            || (check(a,[0,3,6]))
            || (check(a,[4,3,5]))
            || (check(a,[6,7,8]))
            || (check(a,[1,4,7]))
            || (check(a,[2,5,8]))
            || (check(a,[0,4,8]))
            || (check(a,[2,4,6]))
        ){
            if(sessionStorage.currentPlayer == "x"){
                sessionStorage.oScore++
                sessionStorage.winMessage = "oWin"
            }else{
                sessionStorage.xScore++
                sessionStorage.winMessage = "xWin"
            }
            setScore()
            sessionStorage.winState = "true"
            setWinState()
        }else{
            for(let i = 0; i < a.length; i++){
                if(a[i]==""){
                    break;
                }else if(i==a.length-1){
                    sessionStorage.ties++
                    sessionStorage.winMessage = "ties"
                    setScore()
                    sessionStorage.winState = "true"
                    setWinState()
                }
            }
        }
        sessionStorage.caseValue = JSON.stringify(a)
    })
    
}

function setBg(){
    for(let i = 0; i < cases.length; i++){
        const cas = cases[i]
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
    }
}

function check(a,b){
    if(a[b[0]]==a[b[1]] && a[b[1]]==a[b[2]] && a[b[0]] != ""){
        if(a[b[0]] == "o"){
            a[b[0]] = "O"
        }else{
            a[b[0]] = "X"
        }
        return true
    }
}

const next = document.getElementById("next")

next.addEventListener("click", () => {
    document.getElementById("result").classList.remove("show")
    cases.forEach(cas=>{
        if(sessionStorage.currentPlayer == "o"){
            cas.style.backgroundImage = "assets/icon-o-outline.svg";
        }else{
            cas.style.backgroundImage = "assets/icon-x-outline.svg";
        }
        cas.classList.add("empty")
        cas.dataset.value = "";
    })
    let a = ["","","","","","","","",""]
    sessionStorage.caseValue = JSON.stringify(a)
    setTurnTxt()
    setScore()
    sessionStorage.winState = "false"
    setWinState()
    setBg()
})

let restart = document.getElementById("restart")
restart.addEventListener("click", () => {
    sessionStorage.setItem("layerIndex",0)
    setLayer(layers)
    sessionStorage.winState = "false"
    setWinState()
})
let quit = document.getElementById("quit")
quit.addEventListener("click", () => {
    sessionStorage.setItem("layerIndex",0)
    sessionStorage.winState = "false"
    setWinState()
    setLayer(layers)
})