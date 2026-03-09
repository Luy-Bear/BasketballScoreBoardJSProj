let homePoints = 0;
let guestPoints = 0;

let homeFouls = 0;
let guestFouls = 0;


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