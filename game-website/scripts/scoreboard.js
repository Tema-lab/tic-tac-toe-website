const userProfile = document.getElementById("user-profile");
const scoreboardTable = document.getElementById("scoreboard-table");
let userInfo = JSON.parse(localStorage.getItem("users"));
function setProfileName(){
    if(sessionStorage.getItem("loggedUser")){
        userProfile.innerHTML = JSON.parse(sessionStorage.getItem("loggedUser"));
    }
}
window.onload = function (){
    setProfileName();
}
function updateScoreboardTable() {
    let scoreBoardStr = `<table id="scoreboard-table"><thead><tr><th>Position</th><th>Name</th><th>Crosses</th><th>Circles</th></tr></thead>`;

    let userInfo = JSON.parse(localStorage.getItem("users")) || [];

    if (userInfo.length === 0) {
        scoreBoardStr += `<tr><td>1</td><td>No data </td><td>No data</td><td>No data</td></tr>`;
        scoreBoardStr += "</table>";
        scoreboardTable.innerHTML = scoreBoardStr;
    } else {
        userInfo.sort((a, b) => (b.crossesScore + b.circlesScore) - (a.crossesScore + a.circlesScore));
        for (let i = 0; i < userInfo.length; i++) {
            scoreBoardStr += `<tr><td>${i + 1}</td><td>${userInfo[i].userName}</td><td>${userInfo[i].crossesScore}</td><td>${userInfo[i].circlesScore}</td></tr>`;
        }
        scoreBoardStr += "</table>";
        scoreboardTable.innerHTML = scoreBoardStr;
    }
}

updateScoreboardTable();