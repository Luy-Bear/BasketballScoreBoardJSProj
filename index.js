const PeriodTimerConst = 7 //720

let homePoints = 0;
let guestPoints = 0;

let homeFouls = 0;
let guestFouls = 0;

let period = 1; //1
let timerSec = PeriodTimerConst
let timerEl = document.getElementById("Timer")

let periodOver = 1
let gameOver = 0

let intervalId = 0

alert("The period timer in the NBA is normally set to 12 minutes, but for testing and show casing purposes I have set it to 7 seconds so you can test buttons and also program states")

timerEl.textContent = ConvertSecsToTimer()

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
            }
            periodOverFn() 
        }
    }
}

function UpdateWinningMarker(){
    //Gets the HomePoints from string ele, converts to int, adds to gomeFouls taken as string converted to int
    let HomeTotScore = parseInt(document.getElementById("HomePoints").textContent) + parseInt(document.getElementById("HomeFouls").textContent)
    
    //Gets the HomePoints from string ele, converts to int, adds to gomeFouls taken as string converted to int
    let GuestTotScore = parseInt(document.getElementById("GuestPoints").textContent) + parseInt(document.getElementById("GuestFouls").textContent)
    
    //If home winning, change winning marker light to show Home only
    if(HomeTotScore > GuestTotScore){
        document.getElementById("HomeLight").textContent = "(■)"
        document.getElementById("GuestLight").textContent = "()"
    }
    //If guest winning, change winning marker light to show Guest only
    else if(HomeTotScore < GuestTotScore){
        document.getElementById("HomeLight").textContent = "()"
        document.getElementById("GuestLight").textContent = "(■)"
    }
    //If "drawing" @ 0 - no winning
    else if (HomeTotScore == 0 && GuestTotScore == 0){
        document.getElementById("HomeLight").textContent = "()"
        document.getElementById("GuestLight").textContent = "()"
    }
    //Or if drawing non 0s show both on
    else{
        document.getElementById("HomeLight").textContent = "(■)"
        document.getElementById("GuestLight").textContent = "(■)"
    }

}

function startGame(){
    
    periodOver = 0
    timerSec = PeriodTimerConst
    
    intervalId = window.setInterval(TimerDec, 1000)    

    //change HTML elems
    let startBtnEl = document.getElementById("StartPauseBtn")
    startBtnEl.onclick= pauseFn
    startBtnEl.textContent = "Pause Timer"

    //set add points buttons onclick:
    GivePointBtnsFn(1)

}

function pauseFn(){
    //Before checking timer and resetting we enable buttons if needed
    //When starting next period, periodOverFn() updates text, but when starting next period we use this funciton to renable the buttons
    console.log(periodOver + " " + timerSec)
    if(periodOver && !timerSec) //of periodOver Flag true and timer is 0 (flipped to be non 0)
    {
        TogglePointBtns(1)
    }


    //flip periodOver flag to use as a pause event
    periodOver ? periodOver = 0 : periodOver = 1
    //if timer is 0 set it to time
    if(!timerSec){timerSec = PeriodTimerConst}

    let startBtnEl = document.getElementById("StartPauseBtn")
    if(periodOver && timerSec){ //If periodsOver BUT timer still going means its paused
        startBtnEl.textContent = "Unpause Timer"
        TogglePointBtns(0)        
    }
    else if(!periodOver && timerSec){ //If not Over (unpause) and timer still going, its UnPaused
        startBtnEl.textContent = "Pause Timer"
        TogglePointBtns(1)
    }
    

}

function periodOverFn(){
    periodOver = 1
    period++
    let periodCounter = document.getElementById("Period")
    periodCounter.textContent = period+"/4"

    let startBtnEl = document.getElementById("StartPauseBtn")
    startBtnEl.textContent = "Start Next Period"
 
    //Stop points updating
    TogglePointBtns(0)
}

function GameEnd(){
    periodOver = 1
    //Stop timer/period/points updating
    TogglePointBtns(0)
    let startBtnEl = document.getElementById("StartPauseBtn")
    startBtnEl.disabled = 1
}

function resetGame(){
    //Resets Points
    homePoints = 0
    guestPoints = 0
    homeFouls = 0
    guestFouls = 0
    //Reset Scoreboard info
    period = 1
    timerSec = PeriodTimerConst
    //Reset Flags
    periodOver = 1
    gameOver = 0

    //Remove interval
    window.clearInterval(intervalId);

    //Reset pause/unpause button to start btn
    let startBtnEl = document.getElementById("StartPauseBtn")
    startBtnEl.onclick = startGame
    startBtnEl.textContent = "Start Game"
    startBtnEl.disabled = 0

    //reset info
    //Rests Score
    let PointsEl = document.getElementById("HomePoints")
    PointsEl.textContent = homePoints
    PointsEl = document.getElementById("GuestPoints")
    PointsEl.textContent = guestPoints
    PointsEl = document.getElementById("HomeFouls")
    PointsEl.textContent = homeFouls
    PointsEl = document.getElementById("GuestFouls")
    PointsEl.textContent = guestFouls
    //Rest timer
    timerEl.textContent = ConvertSecsToTimer()
    //Rest period
    let periodCounter = document.getElementById("Period")
    periodCounter.textContent = period+"/4"
    //Rest winning marker
    UpdateWinningMarker()
    //enable buttons with no onclick - prefered look 
    GivePointBtnsFn(0)
    TogglePointBtns(1)
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
    
    UpdateWinningMarker()
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
    
    UpdateWinningMarker()
}

function TogglePointBtns(OnOff){
    let buttonEl = document.getElementById("addOneHome")
    buttonEl.disabled = !OnOff
    buttonEl = document.getElementById("addTwoHome")
    buttonEl.disabled = !OnOff
    buttonEl = document.getElementById("addThreeHome")
    buttonEl.disabled = !OnOff
    buttonEl = document.getElementById("HomeFoulbtn")
    buttonEl.disabled = !OnOff
    
    buttonEl = document.getElementById("addOneGuest")
    buttonEl.disabled = !OnOff
    buttonEl = document.getElementById("addTwoGuest")
    buttonEl.disabled = !OnOff
    buttonEl = document.getElementById("addThreeGuest")
    buttonEl.disabled = !OnOff
    buttonEl = document.getElementById("GuestFoulbtn")
    buttonEl.disabled = !OnOff
}

function GivePointBtnsFn(Have){
    if(Have){
        //gives and onclick functoins to add points buttons
        let buttonEl = document.getElementById("addOneHome")
        buttonEl.onclick = () => AddToPoints(1,'home')
        buttonEl = document.getElementById("addTwoHome")
        buttonEl.onclick = () => AddToPoints(2,'home')
        buttonEl = document.getElementById("addThreeHome")
        buttonEl.onclick = () => AddToPoints(3,'home')
        buttonEl = document.getElementById("HomeFoulbtn")
        buttonEl.onclick = () => AddToFouls('home')
        
        buttonEl = document.getElementById("addOneGuest")
        buttonEl.onclick = () => AddToPoints(1,'guest')
        buttonEl = document.getElementById("addTwoGuest")
        buttonEl.onclick = () => AddToPoints(2,'guest')
        buttonEl = document.getElementById("addThreeGuest")
        buttonEl.onclick = () => AddToPoints(3,'guest')
        buttonEl = document.getElementById("GuestFoulbtn")
        buttonEl.onclick = () => AddToFouls('guest')
    }
    else{
        //gives and onclick functoins to add points buttons
        let buttonEl = document.getElementById("addOneHome")
        buttonEl.onclick = ""
        buttonEl = document.getElementById("addTwoHome")
        buttonEl.onclick = ""
        buttonEl = document.getElementById("addThreeHome")
        buttonEl.onclick = ""
        buttonEl = document.getElementById("HomeFoulbtn")
        buttonEl.onclick = ""
        
        buttonEl = document.getElementById("addOneGuest")
        buttonEl.onclick = ""
        buttonEl = document.getElementById("addTwoGuest")
        buttonEl.onclick = ""
        buttonEl = document.getElementById("addThreeGuest")
        buttonEl.onclick = ""
        buttonEl = document.getElementById("GuestFoulbtn")
        buttonEl.onclick = ""

    }
}