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
var numSquares = 3, // Default is "easy" mode
	random,
	rgb = [0, 0, 0], // 3 item array of numbers, initially filled with 0s 
	rgbStr,
	colorPrompt,
	correctIndex,
	correctColor;

// Get HTML objects
var squares = document.getElementsByClassName( "square" ),
	message = document.getElementById( "message" ),
	playAgain = document.getElementById( "play-again" ),
	easyButton = document.getElementById( "easy" ),
	hardButton = document.getElementById( "hard" );

newGame();


// Event Listeners
// Loop through squares
for ( var i = 0; i < squares.length; i++ ) {
	// Add click event listener for each square
	squares[i].addEventListener( "click", function() {
		testSquare( this );
	});
}

// Restart game when button is clicked
playAgain.addEventListener( "click", function() {
	newGame();
})

// Select difficulty mode
easyButton.addEventListener( "click", function() {
	numSquares = 3;
	newGame();
});

hardButton.addEventListener( "click", function() {
	numSquares = 6;
	newGame();
});


// Functions
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
		// Make squares visible
		squares[i].style.opacity = 1;
	}

	// Loop through unused squares (if in "easy" mode)
	for( var i = numSquares; i < squares.length; i++) {
		// Hide visible
		squares[i].style.opacity = 0;
	}

	// Select a color from the assigned colors as the correct color
	correctIndex = Math.floor( Math.random() * numSquares );
	correctColor = colorsArr[ correctIndex ];

	// Get color-prompt HTML object
	colorPrompt = document.getElementById( "color-prompt" );

	// Display correct color rgb code
	colorPrompt.textContent = correctColor;

	// Clear text from message element
	message.textContent = "";

	// Reset play again button text
	playAgain.textContent = "New Game";
}

function testSquare( square ) {
	// Check if square shows the rgb code color
	if ( square.style.backgroundColor == correctColor ) {
		
		// All squares become the correct color
		for ( var j = 0; j < numSquares; j++ ) {
			squares[j].style.backgroundColor = correctColor;
		}

		// Show win message
		message.textContent = "You win!";

		// Prompt play again
		playAgain.textContent = "Play again?";

	} else {
		
		// Square disappears
		square.style.opacity = 0;

		// Show win message
		message.textContent = "Try again";
	}
}
