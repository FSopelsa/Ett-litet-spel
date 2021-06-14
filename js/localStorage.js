function init() {
	totPoints = document.getElementById("totPoints");
	countGames = document.getElementById("countGames");
} // End init
window.addEventListener("load",init);
// ------------------------------
// Räknar ut summan av de poäng som sparats i arrayen totalPoints.
function getSum(total, num) {
    return total + Math.round(num);
} // End getSum
// ------------------------------
// Sparar total poäng i localStorage
 function savePoints() {
	let newTotalPoints = totalPoints.reduce(getSum, 0) // Summan av totalPoints
	localStorage.PointsFn222hnN = parseFloat(newTotalPoints);
    writeOutPointsAndGames();
} // End savePointsAndGames
// ------------------------------
// Skriver ut localStorag 
function writeOutPointsAndGames() {
	if (localStorage.PointsFn222hnN) {
        totPoints.innerHTML = Number(localStorage.PointsFn222hnN);
	}
	else {
		totPoints.innerHTML = "0";
        localStorage.PointsFn222hnN = Number(0);
    }
    if (localStorage.GamesFn222hnN) {
		countGames.innerHTML = Number(localStorage.GamesFn222hnN);
	}
	else {
        localStorage.GamesFn222hnN = 0;
	  	countGames.innerHTML =  Number(0);
    }
} // End writeOutPointsAndGames 