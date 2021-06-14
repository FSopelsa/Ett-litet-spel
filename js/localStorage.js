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
	localStorage.fn222hnPoints = Number(newTotalPoints);
    writeOutPointsAndGames();
} // End savePointsAndGames
// ------------------------------
// Skriver ut localStorag 
function writeOutPointsAndGames() {
	console.log(localStorage.fn222hnGames,"localStorage.fn222hnGames")
	console.log(localStorage.fn222hnPoints,"localStorage.fn222hnPoints")
	if (localStorage.fn222hnPoints) {
        totPoints.innerHTML = localStorage.fn222hnPoints;
	}
    if (localStorage.fn222hnGames) {
		countGames.innerHTML = localStorage.fn222hnGames;
	  }
	  else
	  	countGames.innerHTML =  "0";
} // End writeOutPointsAndGames