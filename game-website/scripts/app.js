const cells = document.querySelectorAll("div span");
const singleCells = document.querySelectorAll(".cell");
const mainSection = document.getElementById("main-section");
const playBtn = document.getElementById("play-btn");
const playGround = document.getElementById("playground");
const switches = document.getElementById("switches");
const slider = document.getElementById("slider");

let currTurn = "X";
let isGameOver = false;
let winningSets = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
];
let playgroundBoard = ['','','','','','','','',''];

const gameStatus = {
    playerXWon:"Player X Won",
    playerYWon:"Player Y Won",
    tie: "TIE"
};



//remove main section on Play button click
const removeMainSectionHandler = () =>{
    mainSection.classList.add("hide");
    switches.classList.remove("hide");
    switches.classList.add("switches");
    buildBoard();
}

//show tic-tac-toe cells (playground)
const buildBoard = () =>{
    playGround.classList.remove("hide");
}
//for each cell remove its text content and apply respective turn Icon
//check for winner call, moveSlider function, change turn function
cells.forEach((el, index)=>{
    el.innerHTML = "";
    el.addEventListener("click",()=> userInput(el,index));
});

const userInput = (el)=>{
    if(!isGameOver){
        el.innerHTML = currTurn;
        selectWinner();
        moveSlider();
        changeTurn();
    }
}


//distinguish the winning sets within cells
const selectWinner = () =>{
   for(let i = 0; i < winningSets.length; i++){
        let v0 = cells[winningSets[i][0]].innerHTML;
        let v1 = cells[winningSets[i][1]].innerHTML;
        let v2 = cells[winningSets[i][2]].innerHTML;
        if(v0 !== "" && v0 === v1 && v0 === v2){
            alert(currTurn);
        }
   }
}


//change of turn
const changeTurn = () =>{
    if(currTurn === "X"){
        currTurn = "O";
    }else{
        currTurn = "X";
    }
}

//moving slider function by toggling class to active
const moveSlider = () =>{
    slider.classList.toggle("active");
}


playBtn.addEventListener("click", removeMainSectionHandler);