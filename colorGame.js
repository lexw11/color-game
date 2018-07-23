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
var numSquares = 6, // Default is "hard" mode
	correctColor;

// Query HTML objects
var squares 		= document.getElementsByClassName( "square" ),
	colorPrompt 	= document.getElementById( "color-prompt" ),
	message 		= document.getElementById( "message" ),
	restartButton 	= document.getElementById( "restart" ),
	easyButton 		= document.getElementById( "easy" ),
	hardButton 		= document.getElementById( "hard" );

// Start new game
newGame();

// ========================
// Add Event Listeners
// ========================
// Loop through squares
for ( var i = 0; i < squares.length; i++ ) {
	// Test if square is correct color when clicked
	squares[i].addEventListener( "click", function() {
		testSquare( this );
	});
}

// Restart game when button is clicked
restartButton.addEventListener( "click", function() {
	newGame();
})

// Select difficulty mode
easyButton.addEventListener( "click", function() {
	numSquares = 3;
	// Restart game
	newGame();
});

hardButton.addEventListener( "click", function() {
	numSquares = 6;
	// Restart game
	newGame();
});

// ========================
// Functions
// ========================
function newGame() {
	// Show squares and get array of colors
	var colors = colorSquares( squares, numSquares );

	// Pick color prompt from colors array
	getColorPrompt( colors, numSquares );

	// Clear text from message element
	message.textContent = "";

	// Reset restart button text
	restartButton.textContent = "New Game";

	// Reset RGB prompt text color
	colorPrompt.style.color = 'var(--header-color)';

	// Highlight button that matched difficulty mode
	if ( numSquares == 6 ) {
		// Reset "East" button
		easyButton.style.backgroundColor = 'var(--header-color)';
		easyButton.style.color = '#fff';
		
		// Highlight "Hard" button
		hardButton.style.backgroundColor = '#fff';
		hardButton.style.color = 'var(--header-color)';

	} else {
		// Reset "Hard" button
		hardButton.style.backgroundColor = 'var(--header-color)';
		hardButton.style.color = '#fff';
		
		// Highlight "Easy" button
		easyButton.style.backgroundColor = '#fff';
		easyButton.style.color = 'var(--header-color)';
	}
}

function testSquare( square ) {
	// Check if square shows the rgb code color
	if ( square.style.backgroundColor == correctColor ) {
		// All squares become the correct color
		for ( var j = 0; j < numSquares; j++ ) {
			squares[j].style.backgroundColor = correctColor;
		}

		// RGB prompt text becomes correct color
		colorPrompt.style.color = correctColor;

		// Show win message
		message.textContent = "You win!";

		// Prompt play again
		restartButton.textContent = "Play again?";

	} else {
		// Square disappears
		square.style.opacity = 0;

		// Show win message
		message.textContent = "Try again";
	}
}

// Generates random RGB color string
function randomRgb() {
	var random,
		rgb = [0, 0, 0], // 3 item array, initially filled with 0s 
		rgbStr;

	// Loop through r-g-b numbers
	for( var j = 0; j < rgb.length; j++ ) {
		// Get random number between 0 and 255
		random = Math.floor( Math.random() * 256 );
		
		// Assign number to current rgb array index
		rgb[j] = random;
	}

	// Create rgb string for new rgb array
	rgbStr = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
	return rgbStr;
}

// Shows and colors squares for new game. Returns array of colors
function colorSquares( squares, numSquares ) {
	var newRgb,
		colorsArr = [];

	for( var i = 0; i < squares.length; i++) {
		if( i < numSquares ) {
			// Make squares visible
			squares[i].style.opacity = 1;

			// Create new rgb string
			newRgb = randomRgb();
			// Assign color to square
			squares[i].style.backgroundColor = newRgb;

			// Add color to array
			colorsArr.push( newRgb );

		} else {
			// Hide visible
			squares[i].style.opacity = 0;	
		}
	}
	return colorsArr;
}

// Randomly selects and displays the color prompt from the color array
function getColorPrompt( colorsArr, numSquares ) {
	var correctIndex;
	
	// Select a color from the assigned colors as the correct color
	correctIndex = Math.floor( Math.random() * numSquares );
	correctColor = colorsArr[ correctIndex ];

	// Display correct color rgb code
	colorPrompt.textContent = correctColor;
}