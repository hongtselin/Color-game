
var numSquares = 3;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

function generateRandomColor(num) {
    // make an array
    var arr = [];
    // add num random color to array
    for (var i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    // return that array
    return arr;
}

function randomColor() {
    // pick red from 0 to 255
    var r = Math.floor(Math.random() * 256);
    // pick green from 0 to 255
    var g = Math.floor(Math.random() * 256);
    // pick blue from 0 to 255
    var b = Math.floor(Math.random() * 256);
    var randomRGB = "rgb(" + r + ", " + g + ", " + b + ")";
    return randomRGB;
}

function changeColors(color) {
    // loop through all squares
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
    h1.style.backgroundColor = color;
}

function pickAnswerColor() {
    // pick a radom number from 0 to 5
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function reset(){
    // genenrate new colors
    colors = generateRandomColor(numSquares);
    // pick a new answer color
    pickedColor = pickAnswerColor();
    // change color for squares
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }
    }
    // change colorDisplay to match answer color
    colorDisplay.textContent = pickedColor;
    // reset color for h1
    h1.style.backgroundColor = "steelblue";
    // reset messageDisplay
    messageDisplay.textContent = "";
    // change back the reset button to "new color"
    resetButton.textContent = "New colors";
}

function init() {
    // add mode buttons event listener
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            // figure out how many square to show and reset accordingly
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    }
    // add eventlistener to all squares
    for (let i = 0; i < squares.length; i++) {
        // add click listener to square
        squares[i].addEventListener("click", function() {
            // grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            // compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                resetButton.textContent = "Play again?";
            } else {
                // fade the square out
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again!";
            }
        });
    }
    // reset the page
    reset();
}



init();
resetButton.addEventListener("click", reset);



