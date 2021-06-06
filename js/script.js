// Globala konstanter och variabler
const allBrickNames = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40"]; // Namn på bilder (brickor)
// Element i gränssnittet
var newGameBtn            // Referens till "nytt spel-knappen"
var newBricksBtn          // Referens till "nya brickor-knappen"
var boardElem             // Referens till hela brädet
var boardElemEmpty        // Referens till tomma fält på brädet
var newBricksElemEmpty    // Referens till de tomma fält där nya brickor varit
var newBricksElemBrick    // Referens till nya brickor
var dragBrickElem         // Referens till brickor som dras
var pointsThisGame = [];  // Här räknas poäng från aktuellt spel upp
var totalPoints = [];     // Här räknas totalpoäng upp
// ------------------------------
// Laddar in localStorage, initiera globala variabler och kopplar funktion till knappar
function initGame() {
    writeOutPointsAndGames();
    // Referenser till element i gränssnittet
    newGameBtn = document.getElementById("newGameBtn");
    newBricksBtn = document.getElementById("newBricksBtn");
    boardElem = document.getElementById("board").getElementsByTagName("img");
    boardElemEmpty = document.getElementById("board").getElementsByClassName("empty");
    newBricksElemBrick = document.getElementById("newBricks").getElementsByClassName("brick");
    newBricksElemEmpty = document.getElementById("newBricks").getElementsByClassName("empty");
    newBricksElem = document.getElementById("newBricks").getElementsByTagName("img");
    msgElem = document.getElementById("message");
    totPoints = document.getElementById("totPoints");
    countGames = document.getElementById("countGames");
    // Lägg på händelsehanterare
    newGameBtn.addEventListener("click",newGame);
    newBricksBtn.addEventListener("click",newBricks);
    // Aktivera/inaktivera knappar
    newBricksBtn.disabled = true;
    newGameBtn.disabled = false;
} // End init
window.addEventListener("load",initGame); // Se till att init aktiveras då sidan är inladdad
// ------------------------------
// totalPoints får summan av totalpoängen. Återställer gränssnittet - bockar och omgångens poäng etc. Klonar allbBrickNames. Återställer classer i brädet. 
function newGame() {
    localStorage.fn222hnGames = Number(localStorage.fn222hnGames)+1; 
    writeOutPointsAndGames();
    pointsThisGame = 0;     // Omgångspoäng återställs
    msgElem.innerHTML = ""; // Fältet där omgångens poäng skrivs ut återställs
    for (let i = 0; i < 5; i++) {
        rmark = document.getElementById("r"+[i]+"mark")
        if (rmark)
        rmark.innerHTML = "";
        cmark = document.getElementById("c"+[i]+"mark")
        if (rmark)
        cmark.innerHTML = "";
    } // End for
    tempList = allBrickNames.slice(1);  // Kopia av allBrickNames
    for (let i = 0; i < boardElem.length; i++) {
        boardElem[i].classList.remove('brick');
        boardElem[i].classList.add('empty');
        boardElem[i].src = "img/empty.png";
    } // End for 
    // Aktivera/inaktivera knappar
        newGameBtn.disabled = true;
        newBricksBtn.disabled = false;
} // End newGame
// ------------------------------
// 4 nya brickor väljs slumpmässigt. Dessa får händdelshanterare och nya classer. Nya brickor-knappen avaktiveras.
function newBricks(e) {
    for (let i = 0; i < 4; i++) {
        r = Math.floor(tempList.length*Math.random());
        newBricksElem[i].src = "img/" + tempList[r] + ".png";
        newBricksElem[i].id = tempList[r];
        tempList.splice(r,1);
        newBricksElem[i].classList.remove('empty');
        newBricksElem[i].classList.add('brick');
    } // End for 
    for (let i = 0; i < newBricksElemBrick.length; i++) {
        newBricksElemBrick[i].addEventListener("dragstart",dragstartBrick);
        newBricksElemBrick[i].addEventListener("dragend",dragendBrick);
        newBricksElemBrick[i].draggable = true;
    } // End for  
    newBricksBtn.disabled = true;
} // End newBricks
// ------------------------------
// Lägger på händelsehanterare på brädet och sätter dataTransfer för bild och id
function dragstartBrick(e) {
    for (let i = 0; i < boardElemEmpty.length; i++) {
        boardElemEmpty[i].addEventListener("dragover",brickOverBoard);
        boardElemEmpty[i].addEventListener("drop",brickOverBoard);
        boardElemEmpty[i].addEventListener("dragleave",brickOverBoard);
        dragBrickElem = this;
        e.dataTransfer.setData("img",this.innerHTML);
        e.dataTransfer.setData("id",this.id);
    } // End for 
} // End dragstartBricks
// ------------------------------
// Lägger på händelsehanterare på brädet och tar bort dem på de nu tomma rutorna över "nya brickor".
function dragendBrick() {
    for (let i = 0; i < boardElem.length; i++) {
        boardElem[i].removeEventListener("dragover",brickOverBoard);
        boardElem[i].removeEventListener("drop",brickOverBoard);
        boardElem[i].removeEventListener("dragleave",brickOverBoard);
    } // End for 
    for (let i = 0; i < newBricksElemEmpty.length; i++) {
        newBricksElemEmpty[i].removeEventListener("dragstart",dragstartBrick);
        newBricksElemEmpty[i].removeEventListener("drop",brickOverBoard);
        newBricksElemEmpty[i].removeEventListener("dragend",dragendBrick);
        newBricksElemEmpty[i].draggable = false;
    } 
} // End dragendBrick
// ------------------------------
// Ser till att bilder flyttas till där man drar dem. Ser till att rutan man drar bild från får klassen empty istället för brick och gör motsatsen där bilden släppts. Ändrar också bakgrundsbild på det rutor man drar bilder över.
function brickOverBoard(e) {
    e.preventDefault();
    if (e.type == "drop") {
        dragBrickElem.src = "img/empty.png";
        dragBrickElem.classList.remove('brick');
        dragBrickElem.classList.add('empty');
        let dropBrickElem = this; // Här släpps bilden
        dropBrickElem.src = e.dataTransfer.getData("text");
        dropBrickElem.id = e.dataTransfer.getData("id");
        this.style.backgroundColor = "";
        this.classList.remove('empty');
        this.classList.add('brick');
    }
    if (e.type == "dragover") {
            this.style.backgroundColor = "#999";
    }
    if (e.type == "dragleave") {
            this.style.backgroundColor = "";
    }
    controlForNewBricks();
    checkIfBoardIsFull();
} // End brickOverBoard
// ------------------------------
// Kontrollerar om newBricksElem är tom och visar isåfall Nya brickor-knappen igen
function controlForNewBricks() {
    if (newBricksElemEmpty.length == 4)
        newBricksBtn.disabled = false;
} // End controllForNewBricks 
// ------------------------------
// Kontrollerar om brädet är fullt och går isf över till funktionen countPoints
function checkIfBoardIsFull() {
    if (boardElemEmpty.length == 0) {
        newBricksBtn.disabled = true;
        countPoints();
    }    
} // End checkIfFull
// ------------------------------
// Kontrollerar stigande serie i kollumner och rader samt räknar upp poäng.
function countPoints() {  //Kontrollerar stigare serie för rader
    for (let i = 1; i < 5; i++) {
        r = document.getElementsByClassName("r"+[i]);
        rmark = document.getElementById("r"+[i]+"mark")
        for (let i = 0; i < r.length; i++) {
            if (Number(r[0].id)<Number(r[1].id) && Number(r[1].id)<Number(r[2].id) && Number(r[2].id)<Number(r[3].id)) {
            rmark.innerHTML = "&check;";
            pointsThisGame++;
            }
            else 
                rmark.innerHTML = "&cross;";
        } // End for 
    } // End for
    for (let i = 1; i < 5; i++) {
        c = document.getElementsByClassName("c"+[i]);
        cmark = document.getElementById("c"+[i]+"mark")
        for (let i = 0; i < c.length; i++) {
        if (Number(c[0].id)<Number(c[1].id) && Number(c[1].id)<Number(c[2].id) && Number(c[2].id)<Number(c[3].id)) {
            cmark.innerHTML = "&check;";
            pointsThisGame++;
        }
        else 
            cmark.innerHTML = "&cross;";
        } // End for 
    } // End for
    showPoints();
} //End countPoints    
// ------------------------------
// Tar fram och skriver ut rätt poäng för rundan, samt aktiverar knapp för nytt spel.
function showPoints() {
    let pTG = parseFloat(pointsThisGame)/4;
    msgElem.innerHTML = "Du fick denna runda: " + pTG + " poäng.";
    totalPoints = [0]; // totalPoints blir 0
    totalPoints.push(Number(localStorage.fn222hnPoints));
    totalPoints.push(Number(pTG));
    newGameBtn.disabled = false;
    savePoints();
} // End showPoints