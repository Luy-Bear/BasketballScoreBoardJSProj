let homePoints = 0;
let guestPoints = 0;

let homeFouls = 0;
let guestFouls = 0;

let period = 1;
let timerSec = 4 //720
let timerEl = document.getElementById("Timer")

let periodOver = 1
let gameOver = 0

function ConvertSecsToTimer(){
    //rounds timer/60 down to get minds remaining, gets remainder as seconds, pads with 0s for 2 chars length total 
    let result = (Math.trunc(timerSec/60)).toString().padStart(2,"0")+":"+(timerSec%60).toString().padStart(2,"0")
    return result
}

function TimerDec(){
    console.log("In Timer fn")
    if((periodOver || gameOver) != true){
        timerSec--
        timerEl.textContent = ConvertSecsToTimer()

        if(timerSec <= 0){ //if period is over
            if(period == 4){ //check if last period
                GameEnd()
                return
            }`1`
            periodOverFn() 
        }
        UpdateWinningMarker()
    }
}

function UpdateWinningMarker(){

}

function startGame(){
    periodOver = 0
    timerSec = 5 //720
    
    setInterval(TimerDec, 1000)    

    //change HTML elems
    let startBtnEl = document.getElementById("StartPauseBtn")
    startBtnEl.onclick= pauseFn
    startBtnEl.textContent = "Pause Timer"

}

function pauseFn(){
    periodOver ? periodOver = 0 : periodOver = 1
    if(!timerSec){timerSec = 5} //720
}

function periodOverFn(){
    periodOver = 1
    period++
    let periodCounter = document.getElementById("Period")
    periodCounter.textContent = period+"/4"

    let startBtnEl = document.getElementById("StartPauseBtn")
    startBtnEl.textContent = "Start Next Period"
}

function GameEnd(){
    //Stop timer/period/points updating

    let buttonEl = document.getElementById("addOneHome")
    buttonEl.onclick = ""
    buttonEl = document.getElementById("addTwoHome")
    buttonEl.onclick = ""
    buttonEl = document.getElementById("addThreeHome")
    buttonEl.onclick = ""
    
    buttonEl = document.getElementById("addOneGuest")
    buttonEl.onclick = ""
    buttonEl = document.getElementById("addTwoGuest")
    buttonEl.onclick = ""
    buttonEl = document.getElementById("addThreeGuest")
    buttonEl.onclick = ""
    //update reset button fn call
}

function AddToPoints(Points, team){
    if(team == "home"){
        homePoints += Points
        let PointsEl = document.getElementById("HomePoints")
        PointsEl.textContent = homePoints
    }
    else{
        guestPoints += Points
        let PointsEl = document.getElementById("GuestPoints")
        PointsEl.textContent = guestPoints
    }
}

function AddToFouls(team){
    let PointsArr = [0,3,4]
    Points = PointsArr[Math.floor(Math.random() * (3))]

    if(team == "home"){
        homeFouls += Points
        let PointsEl = document.getElementById("HomeFouls")
        PointsEl.textContent = homeFouls
    }
    else{
        guestFouls += Points
        let PointsEl = document.getElementById("GuestFouls")
        PointsEl.textContent = guestFouls
    }
}