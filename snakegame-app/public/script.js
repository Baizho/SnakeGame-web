
const parGame = document.getElementById("Game");
//const parMenuBackG= document.getElementById("MenuBackG");
const parPlaybtn = document.getElementById("Playbtn");
const parMenu = document.getElementById("Menu");
const parScore= document.getElementById("Score");
const parMxscore = document.getElementById("Mxscore");
const parinnerMenu = document.getElementById("innerMenu");
const parspeed = document.getElementById("speed");

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
let gameLength = windowWidth;
if (windowHeight < gameLength) gameLength = windowHeight;

const WidthBlock = gameLength / 10.1;
const HeightBlock = gameLength / 10.1;

let cart = [[8, 1, 4, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
const links = ["Images/empty.png", "Images/Snake Body.png", "Images/Snake face bottom.png", "Images/Snake face left.png", "Images/Snake face right.png", "Images/Snake face top.png", "Images/Snake tail bottom.png", "Images/Snake tail left.png", "Images/Snake tail right.png", "Images/Snake tail top.png", "Images/Apple.png"];
let path = [[0, 0], [0, 1], [0, 2]];
let free = [[0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]];
let score=0,mxscore=0;

let direction = "right", refreshGameId, addAppleId, appleOn = 0,paused=0;

const storagemxscore = localStorage.getItem("Mxscore");
if(storagemxscore!==null){mxscore=parseInt(storagemxscore);}

refreshUI();

window.addEventListener("keydown", (e) => {
    if(e.code==="Space") {
        if(paused===1){paused=0;}
         else if(paused===0){paused=1;}
        e.preventDefault();
    }
    if(paused===1){return;}
    if(e.code==="KeyR") {
        if(parinnerMenu.style.opacity==="1") {
            startGame();
            parinnerMenu.style.opacity=0;
        }
    }
    if ((e.code === "KeyW" || e.code === "ArrowUp") && direction !== "down") { direction = "up"; }
    else if ((e.code === "KeyS" || e.code === "ArrowDown") && direction !== "up") { direction = "down"; }
    else if ((e.code === "KeyA" || e.code === "ArrowLeft") && direction !== "right") { direction = "left"; }
    else if ((e.code === "KeyD" || e.code === "ArrowRight") && direction !== "left") { direction = "right"; }
});
parPlaybtn.addEventListener("click", () => {
    if(parinnerMenu.opacity==="0"){return;}
    startGame();
});

function refreshUI() {
    localStorage.setItem("Mxscore",mxscore);
    parScore.innerText=`Score: ${score}`;
    parMxscore.innerText=`High Score:${mxscore}`;
}

function startGame() {
    refreshGameId = setInterval(refreshGame,300-75*(parspeed.value-1));
    addAppleId = setInterval(addApple, 51);
    parinnerMenu.style.height=`0px`;
    parinnerMenu.style.opacity=0;
}


function stopGame() {
    clearInterval(refreshGameId);
    clearInterval(addAppleId);
    refreshPositions();
    parinnerMenu.style.height=`${windowHeight}px`;
    parinnerMenu.style.opacity=1;
}

function addApple() {
    if (appleOn === 1) { return; }
    appleOn = 1;
    const pos = parseInt(Math.random() * 1000 % free.length);
    let x = free[pos][0], y = free[pos][1];
    cart[x][y] = 10;
    //console.log(free);
}

function refreshPositions() {
    cart = [[8, 1, 4, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    free = [[0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9]];
    path = [[0, 0], [0, 1], [0, 2]];
    appleOn=0;
    direction = "right";
}

function refreshGame() {
    if(paused===1){return;}
    parGame.innerHTML = "";
    Move(direction);
    cart.forEach((row, i) => {
        const frow = document.createElement("div");
        frow.classList.add("Flexrow", "center");
        // frow.style.paddingTop="5px";
        row.forEach((val, j) => {
            const block = document.createElement("div");
            block.style.width = `${WidthBlock}px`;
            block.style.height = `${HeightBlock}px`;
            const image = document.createElement("img");
            image.src = links[val];
            image.style.width = "100%";
            image.style.height = "100%";
            block.appendChild(image);
            frow.appendChild(block);
        })
        parGame.appendChild(frow);
    })
}

function Lastx() {
    return path[path.length - 1][0];
}
function Lasty() {
    return path[path.length - 1][1];
}

function Move(dir) {
    if (dir === "right") {
        doMove(0, 1);
    }
    else if (dir === "left") {
        doMove(0, -1);
    }
    else if (dir === "up") {
        doMove(-1, 0);
    }
    else if (dir === "down") {
        doMove(1, 0);
    }
}

function doMove(px, py) {
    let x = Lastx(), y = Lasty();
    const nx = x + px, ny = y + py;
    if (checkLose(nx, ny) === true) {
        if(mxscore<score){mxscore=score;}
        refreshUI();
        score=0;
        stopGame();
    }
    else {
        free.forEach((row,index)=>{
            if(row[0]===nx && row[1]===ny){
                free.splice(index,1);
            }
        });
        path.push([nx, ny]);
        let x, y, x1, y1;
        x = path[0][0], y = path[0][1];
        cart[x][y] = 0;
        if (cart[nx][ny] === 10) {
            score++;
            appleOn = 0;
        }
        else {
            let removed = path.shift();
            free.push(removed);
        }
        for (let i = 1; i < path.length - 1; i++) {
            x = path[i][0], y = path[i][1];
            cart[x][y] = 1;
        }
        x = path[0][0], y = path[0][1];
        x1 = path[1][0], y1 = path[1][1];
        if (x === x1) {
            if (y + 1 === y1) {
                cart[x][y] = 8;
            }
            else if (y - 1 === y1) {
                cart[x][y] = 7;
            }
        }
        else if (y === y1) {
            if (x + 1 === x1) {
                cart[x][y] = 6;
            }
            else if (x - 1 === x1) {
                cart[x][y] = 9;
            }
        }
        x = path[path.length - 2][0], y = path[path.length - 2][1];
        x1 = path[path.length - 1][0], y1 = path[path.length - 1][1];
        if (x === x1) {
            if (y + 1 === y1) {
                cart[x1][y1] = 3;
            }
            if (y - 1 === y1) {
                cart[x1][y1] = 4;
            }
        }
        if (y === y1) {
            if (x + 1 === x1) {
                cart[x1][y1] = 2;
            }
            if (x - 1 === x1) {
                cart[x1][y1] = 5;
            }
        }
    }
}

function checkLose(x, y) {
    if (x > 9 || x < 0 || y < 0 || y > 9) return true;
    for(let i=1;i<path.length;i++){
        if (x === path[i][0] && y === path[i][1]) return true;
    }
    return false;
}