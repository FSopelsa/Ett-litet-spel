// Globala konstanter och variabler
const allBrickNames = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40"]; // Namn på bilder (brickor)
// Element i gränssnittet
var newGameBtn            // Referens till "nytt spel-knappen"
var newBricksBtn          // Referens till "nya brickor-knappen"
var boardElem             // Referens till hela brädet
var boardElemEmpty        // Referens till tomma fält på brädet
var newBricksElem         // Referens till fält där nya brickor visas
var dragBrickElem         // Referens till brickor som dras
var pointsThisGame = [];  // Här räknas poäng från aktuellt spel upp
var totalPoints = [];     // Här räknas totalpoäng upp
var totalGames;
// ------------------------------
// Initiera globala variabler och koppla funktion till knappar
function init() {
    // Referenser till element i gränssnittet
    
    newGameBtn = document.getElementById("newGameBtn");
    newBricksBtn = document.getElementById("newBricksBtn");
    boardElem = document.getElementById("board").getElementsByTagName("img");
    boardElemEmpty = document.getElementById("board").getElementsByClassName("empty");
    newBricksElem = document.getElementById("newBricks").getElementsByTagName("img");
    newBricksElemEmpty = document.getElementById("newBricks").getElementsByClassName("empty");
    msgElem = document.getElementById("message");
    totPoints = document.getElementById("totPoints");
    countGames = document.getElementById("countGames");

    if (localStorage.TP > 0)
    totPoints.innerHTML = Number(localStorage.TP);

    // Lägg på händelsehanterare
    newGameBtn.addEventListener("click",newGame);
    newBricksBtn.addEventListener("click",newBricks);
    // Aktivera/inaktivera knappar
    newBricksBtn.disabled = true;
    newGameBtn.disabled = false;
} // End init
window.addEventListener("load",init); // Se till att init aktiveras då sidan är inladdad
// ------------------------------
// Återställer bockar & kryss. Klonar allbBrickNames. Återställer classer i brädet samt knapparna.
function newGame() {
    totalGames++;
    countGames.innerHTML = totalGames;
    pointsThisGame = 0;     // Poäng återställs
    msgElem.innerHTML = ""; // Fältet där omgångens poäng skrivs ut återställs
    r1mark.innerHTML = "";  // Bock och kryss för rader återställs
    r2mark.innerHTML = "";  // -  '  '  -
    r3mark.innerHTML = "";  // -  '  '  -
    r4mark.innerHTML = "";  // -  '  '  -
    c1mark.innerHTML = "";  // Bock och kryss för kollumner återställs
    c2mark.innerHTML = "";  // -  '  '  -
    c3mark.innerHTML = "";  // -  '  '  -
    c4mark.innerHTML = "";  // -  '  '  -
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
// 4 nya brickor väljs slumpmässigt. Dessa får händdelshanterare och nya classer
function newBricks(e) {
    for (let i = 0; i < 4; i++) {
        r = Math.floor(tempList.length*Math.random());
        newBricksElem[i].src = "img/" + tempList[r] + ".png";
        newBricksElem[i].id = tempList[r];
        tempList.splice(r,1);
    } // End for 
    for (let i = 0; i < newBricksElem.length; i++) {
        newBricksElem[i].addEventListener("dragstart",dragstartBrick);
        newBricksElem[i].addEventListener("dragend",dragendBrick);
        newBricksElem[i].draggable = true;
        newBricksElem[i].classList.remove('empty');
        newBricksElem[i].classList.add('brick');
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
// Lägger på händelsehanterare
function dragendBrick() {
    for (let i = 0; i < boardElem.length; i++) {
        boardElem[i].removeEventListener("dragover",brickOverBoard);
        boardElem[i].removeEventListener("drop",brickOverBoard);
        boardElem[i].removeEventListener("dragleave",brickOverBoard);
    } // End for 
} // End dragendBrick
// ------------------------------
// Ser till att bilder flyttas till där man drar dem. Ser till att rutan man drar bild från får klassen empty istället för brick och gör motsatsen där bilden släppts. Ändrar också bakgrundsbild på det rutor man drar bilder över.
function brickOverBoard(e) {
    e.preventDefault();
    if (e.type == "drop") {
        dragBrickElem.classList.remove('brick');
        dragBrickElem.classList.add('empty');
        dragBrickElem.src = "img/empty.png";
        let dropBrickElem = this;
        if (dropBrickElem.src = "img/empty.png") {
        dropBrickElem.src = e.dataTransfer.getData("text");
        dropBrickElem.id = e.dataTransfer.getData("id");
        this.style.backgroundColor = "";
        this.classList.remove('empty');
        this.classList.add('brick');
        }
    }
    if (e.type == "dragover") {
        this.style.backgroundColor = "#999";
    }
    if (e.type == "dragleave") {
        this.style.backgroundColor = "";
    }
    controllForNewBricks();
    checkIfFull();
} // End brickOverBoard
// ------------------------------
// Kontrollerar om newBricksElem är tom och visar isåfall Nya brickor-knappen igen
function controllForNewBricks() {
    if (newBricksElemEmpty.length == 4)
        newBricksBtn.disabled = false;
} // End controllForNewBricks 
// ------------------------------
// Kontrollerar om brädet är fullt och går isf över till funktionen countPoints
function checkIfFull() {
    if (boardElemEmpty.length == 0) {
        newBricksBtn.disabled = true;
        countPoints();
    }    
} // End checkIfFull
// ------------------------------
// Kontrollerar stigande serie i kollumner och rader samt räknar upp poäng.
function countPoints() {                        //Kontrollerar stigare serie för rader
    r1 = document.getElementsByClassName("r1");
    for (let i = 0; i < r1.length; i++) {
        if (Number(r1[0].id)<Number(r1[1].id) && Number(r1[1].id)<Number(r1[2].id) && Number(r1[2].id)<Number(r1[3].id)) {
            r1mark.innerHTML = "&check;";
            pointsThisGame++;
        }
        else 
            r1mark.innerHTML = "&cross;";
    } // End for 
    r2 = document.getElementsByClassName("r2");
    for (let i = 0; i < r2.length; i++) {
        if (Number(r2[0].id)<Number(r2[1].id) && Number(r2[1].id)<Number(r2[2].id) && Number(r2[2].id)<Number(r2[3].id)) {
            r2mark.innerHTML = "&check;";
            pointsThisGame++;
        }
        else 
            r2mark.innerHTML = "&cross;";
    } // End for 
    r3 = document.getElementsByClassName("r3");
    for (let i = 0; i < r3.length; i++) {
        if (Number(r3[0].id)<Number(r3[1].id) && Number(r3[1].id)<Number(r3[2].id) && Number(r3[2].id)<Number(r3[3].id)) {
            r3mark.innerHTML = "&check;";
            pointsThisGame++;
        }
        else 
            r3mark.innerHTML = "&cross;";
    } // End for 
    r4 = document.getElementsByClassName("r4");
    for (let i = 0; i < r4.length; i++) {
        if (Number(r4[0].id)<Number(r4[1].id) && Number(r4[1].id)<Number(r4[2].id) && Number(r4[2].id)<Number(r4[3].id)) {
            r4mark.innerHTML = "&check;";
            pointsThisGame++;
        }
        else 
            r4mark.innerHTML = "&cross;";
    } // End for                              //Kontrollerar stigade serie för kollumner
    c1 = document.getElementsByClassName("c1");
    for (let i = 0; i < c1.length; i++) {
        if (Number(c1[0].id)<Number(c1[1].id) && Number(c1[1].id)<Number(c1[2].id) && Number(c1[2].id)<Number(c1[3].id)) {
            c1mark.innerHTML = "&check;";
            pointsThisGame++;
        }
        else 
            c1mark.innerHTML = "&cross;";
    } // End for 
    c2 = document.getElementsByClassName("c2");
    for (let i = 0; i < c2.length; i++) {
        if (Number(c2[0].id)<Number(c2[1].id) && Number(c2[1].id)<Number(c2[2].id) && Number(c2[2].id)<Number(c2[3].id)) {
            c2mark.innerHTML = "&check;";
            pointsThisGame++; 
        }
        else 
            c2mark.innerHTML = "&cross;";
    } // End for 
    c3 = document.getElementsByClassName("c3");
    for (let i = 0; i < c3.length; i++) {
        if (Number(c3[0].id)<Number(c3[1].id) && Number(c3[1].id)<Number(c3[2].id) && Number(c3[2].id)<Number(c3[3].id)) {
            c3mark.innerHTML = "&check;";
            pointsThisGame++;
        }    
        else 
            c3mark.innerHTML = "&cross;";
    } // End for 
    c4 = document.getElementsByClassName("c4");
    for (let i = 0; i < c4.length; i++) {
        if (Number(c4[0].id)<Number(c4[1].id) && Number(c4[1].id)<Number(c4[2].id) && Number(c4[2].id)<Number(c4[3].id)) {
            c4mark.innerHTML = "&check;";
            pointsThisGame++;
        }
        else 
            c4mark.innerHTML = "&cross;";
    } // End for
    showPoints();
} // End countPoints
// ------------------------------
// Tar fram, skriver ut och sparar rätt poäng för rundan, samt aktiverar knapp för nytt spel.
function showPoints() {
    let pTG = parseFloat(pointsThisGame)/4;
    msgElem.innerHTML = "Du fick denna runda: " + pTG + " poäng.";
    totalPoints.push(Number(pTG));
    newGameBtn.disabled = false;
    newTotalPoints();
} // End showPoints
// ------------------------------
// Räknar ut summan av de poäng som sparats i arrayen totalPoints.
function getSum(total, num) {
    return total + Math.round(num);
} // End getSum
// ------------------------------
// Skriver ut summan av de poäng som sparats i arrayen totalPoints.
function newTotalPoints(item) {
    totPoints.innerHTML = totalPoints.reduce(getSum, 0);
    //let storeTotalPoints = totalPoints.reduce(getSum, 0);

} // End newTotalPoints
// ------------------------------
function localStore() {
    localStorage.TP = totalPoints.reduce(getSum, 0);
}

