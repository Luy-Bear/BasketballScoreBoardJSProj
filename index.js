let homePoints = 0;
let guestPoints = 0;

let homeFouls = 0;
let guestFouls = 0;

let period = 0;
let timerSec = 4 //720
let timerEl = document.getElementById("Timer")

let periodOver = 1
let gameOver = 0

setInterval(TimerDec, 1000)

function ConvertSecsToTimer(){
    let result = Math.trunc(timerSec/60)+":"+(timerSec%60)
    return result
}

function TimerDec(){
    console.log("In Timer fn")
    if((periodOver || gameOver) != true){
        console.log("Oops")
        timerSec--
        timerEl.textContent = ConvertSecsToTimer()

        if(timerSec <= 0){ //if period is over
            if(period == 4){ //check if last period
                GameEnd()
                return
            }
            periodOverFn() 
        }
        UpdateWinningMarker()
    }
   


}
function UpdateWinningMarker(){

}

function unPause(){
    periodOver = 0
    timerSec = 5 //720
    //change HTML elems
}

function periodOverFn(){
    periodOver = 1
    period++
    let periodCounter = document.getElementById("Period")
    periodCounter.textContent = period+"/4"
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