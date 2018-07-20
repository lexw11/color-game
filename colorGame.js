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

console.log("colorGame.js connected");

// Declare and initialize variables
var numSquares = 3, // "Easy" setting by default
	random,
	rgb = [0, 0, 0], // 3 item array of numbers, initially filled with 0s 
	rgbStr;

// Loop through squares
for( var i = 0; i < numSquares; i++ ) {
	// Loop through r-g-b numbers
	for( var j = 0; j < rgb.length; j++ ) {

		// Get random number between 0 and 255
		random = Math.floor(Math.random() * 256);
		// Assign number to current rgb array index
		rgb[j] = random;
	}

	// Create rgb string for new rgb array
	rgbStr = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
	console.log(rgbStr);
}