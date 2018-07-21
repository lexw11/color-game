/* Steps:
 * Initial Setup
 * 	1. Generate a random rgb color code on page load
 *  2. Assign color code to HTML <div> square
 *  3. Generate and assign color codes for n squares (n = 3, initially)
 *  4. Select one color from generated colors and print rgb code in HTML header
 * Game Play
 *  5. When user clicks square, check if square color equals printed color
 *  6. If no, prompt user to guess again. Hide square.
 *  7. If yes, log/alert win message and end game.
 * Game Controls
 *	8. Add "new game" button. Regenerate colors when button is clicked. Change text content when game ends.
 *  9. On page load, only display the number of squares equal to specified number in JS
 * 10. Add "easy"/"hard" button options. Buttons change number of squares, n (3 or 6).
 */

// ========================
// Initial Setup
// ========================

// Declare and initialize variables
var squares,
	numSquares,
	random,
	rgb = [0, 0, 0], // 3 item array of numbers, initially filled with 0s 
	rgbStr,
	colorPrompt,
	correctIndex,
	correctColor;

// Select all squares in document
squares = document.getElementsByClassName("square");
// Get the number of squares
numSquares = squares.length;

newGame();

function newGame() {
	var colorsArr = [];
	// Loop through squares
	for( var i = 0; i < numSquares; i++ ) {
		// Loop through r-g-b numbers
		for( var j = 0; j < rgb.length; j++ ) {

			// Get random number between 0 and 255
			random = Math.floor( Math.random() * 256 );
			// Assign number to current rgb array index
			rgb[j] = random;
		}
		// Create rgb string for new rgb array
		rgbStr = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
		// Add string to array
		colorsArr.push( rgbStr );
		// Assign square color
		squares[i].style.backgroundColor = rgbStr;
	}

	console.log(colorsArr);

	// Select a color from the assigned colors as the correct color
	correctIndex = Math.floor( Math.random() * numSquares );
	correctColor = colorsArr[ correctIndex ];

	// Get color-prompt HTML object
	colorPrompt = document.getElementById( "color-prompt" );

	// Display correct color rgb code
	colorPrompt.textContent = correctColor;
}

// ========================
// Game Play
// ========================
// Loop through squares
for ( var i = 0; i < numSquares; i++ ) {

	// Add click event listener for each square
	squares[i].addEventListener( "click", function() {
		console.log(this.style.backgroundColor);
		// Check if square shows the rgb code color
		if ( this.style.backgroundColor == correctColor ) {
			console.log("Correct color!");
		} else {
			console.log("Try again");
		}
	});
}

// Select play again button
var playAgain = document.getElementById( "play-again" );
// Restart game when button is clicked
playAgain.addEventListener( "click", function() {
	newGame();
})