const cells = document.querySelectorAll("div span")
const mainSection = document.getElementById("main-section");
const playBtn = document.getElementById("play-btn");
const playGround = document.getElementById("playground");
const switches = document.getElementById("switches");

const xIcon = `<i class="fa-solid fa-x fa-x"></i>`;
const oIcon  = `<i class="fa-solid fa-o"></i>`;

const removeMainSectionHandler = () =>{
    mainSection.classList.add("hide");
    switches.classList.remove("hide");
    switches.classList.add("switches");
    buildBoard();
}
const buildBoard = () =>{
    cells.forEach((cell)=>{
        cell.classList.add("cell");
        playGround.append(cell);
    })
}
const clickedCell = (el) =>{

}

clickedCell();
playBtn.addEventListener("click", removeMainSectionHandler);