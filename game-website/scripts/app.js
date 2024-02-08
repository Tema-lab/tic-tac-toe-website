//constants
const cells = document.querySelectorAll(".cell");
const mainSection = document.getElementById("main-section");
const playBtn = document.getElementById("play-btn");
const playGround = document.getElementById("playground");
const switches = document.getElementById("switches");
const slider = document.getElementById("slider");
const restartBtn = document.getElementById("restart-btn");
const userProfile = document.getElementById("user-profile");
const drawScoreEl = document.getElementById("draw-score");
const circleScoreEl = document.getElementById("circle-score");
const crossScoreEl = document.getElementById("cross-score");
const gamesPlayedEl = document.getElementById("total-games");
const maxScore = 5;
let currTurn = "X";
let winningSets = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
];
let xScore = 0;
let oScore = 0;
let drawScore = 0;
let countTurns = 0;
let hasWon = false;
let gamesPlayed = 1;

cells.forEach(cell=>{
    cell.addEventListener("click",()=>{
        if(currTurn === "X"){
            countTurns++;
            cell.innerText = "X";
            cell.disabled = true;
            changePlayer();
            moveSlider();
        }
        else{
            countTurns++;
            cell.innerText = "O";
            cell.disabled = true;
            changePlayer();
            moveSlider();
        }
        checkForWin();
        checkForDraw();
    })
});
const checkForWin = () =>{
    winningSets.forEach(set=>{
        let [cellA, cellB, cellC] = [
            cells[set[0]].innerHTML,
            cells[set[1]].innerHTML,
            cells[set[2]].innerHTML,
        ];
        if(cellA !== "" && cellB !== "" && cellC !== ""){
            if(cellA === cellB && cellB === cellC){
                winnerFuncHandler(cellA);
                disableBtns();
                addScoresToLocalStorage();
                countTotalGamesPlayer();
                hasWon = true;
            }
        }
    });
}
const checkForDraw = () =>{
    let isDraw = false;
    cells.forEach(cell=>{
       if(cell.innerText !== "" && !hasWon && countTurns === 9){
           console.log("draw");
           isDraw = true;
       }
    });
    if(isDraw){
        drawScore++;
        drawScoreEl.innerText = "";
        drawScoreEl.innerText = `${drawScore}`;
    }
}
const countTotalGamesPlayer = () =>{
    gamesPlayedEl.innerText = "";
    gamesPlayedEl.innerText = `${gamesPlayed}`;
}

const winnerFuncHandler = (cellValue) =>{
    if(cellValue === "X"){
        xScore++;
        crossScoreEl.innerText = "";
        crossScoreEl.innerText = `${xScore}`;
    }else{
        oScore++;
        circleScoreEl.innerText = "";
        circleScoreEl.innerText = `${oScore}`;
    }
}
const moveSlider = () =>{
    slider.classList.toggle("active");
};
const removeMainSectionHandler = () =>{
    mainSection.classList.add("hide");
    switches.classList.remove("hide");
    switches.classList.add("switches");
    buildBoard();
};
const changePlayer = () =>{
    currTurn = (currTurn === "X") ? "O" : "X";
}
const buildBoard = () =>{
    playGround.classList.remove("hide");
};
const enableBtns = () =>{
    cells.forEach(cell=>{
        cell.disabled = false;
        if(currTurn === "O"){
            changePlayer();
            moveSlider();
        }
    })
}
const disableBtns = () =>{
    cells.forEach(cell=>{
        cell.disabled = true;
    })
}
const restartGame = () =>{
    cells.forEach(cell=>{
        cell.innerHTML = "";
        enableBtns();
    });
    gamesPlayed++;
    countTurns = 0;
};

function setProfileName(){
    if(sessionStorage.getItem("loggedUser")){
        userProfile.innerHTML = JSON.parse(sessionStorage.getItem("loggedUser"));
    }
}
function addScoresToLocalStorage() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let scores = {
        crossesScore: xScore,
        circlesScore: oScore,
        drawsScore: drawScore,
        totalGamesPlayed: gamesPlayed
    };
    
    let currUserId = JSON.parse(sessionStorage.getItem("loggedUserId"));
    let currentUserIndex = users.findIndex(user => user.id === currUserId);
    if (currentUserIndex !== -1) {
        users[currentUserIndex] = { ...users[currentUserIndex], ...scores };
    } else {
        let newUser = {
            id: currUserId,
            ...scores
        };
        users.push(newUser);
    }
    localStorage.setItem("users", JSON.stringify(users));
}
window.onload = function (){
    setProfileName();
}

restartBtn.addEventListener("click", restartGame);
playBtn.addEventListener("click", removeMainSectionHandler);
