// When the pattern is being repeated, how long in miliseconds do you have to wait, before one button is pressed after another?
var repetitionDelay = 750;

// This is for starting the game
var isGameRunning = false;

var isDemoPlaying = false;  //This refers to whether or not the pattern that the player is supposed to repeat is being played.

var isGameOver = false;

var currentRunningPattern = []
$("body")[0].addEventListener("keypress", function(event) {

    if (isGameRunning == true) {return;}

    var pressedKey = event.key.toLowerCase()
    if (pressedKey != 's')  {return;}

    isGameRunning = true;
    
    // continuePattern() is the main function, which will 'advance' the game.
    continuePattern(currentRunningPattern)
});

// For now, the buttons will just play their press animation when clicked.
var correctPresses = 0;
$(".button").on("click", function(event){
    if (isGameRunning == false || isDemoPlaying == true || isGameOver == true) {return;}

    //This completely relies on the fact, that the classes of buttons are set up like this:
    //[colorOfButton] button
    //So, if some bozo were to change that in the HTML code and things break, you know where to look.
    var pressedButtonColor = event.target.classList[0];
    buttonPressAnimation(pressedButtonColor);

    var numberOfColorsInPattern = currentRunningPattern.length;
    var colorToPress = currentRunningPattern[0 + correctPresses];
    if(colorToPress == pressedButtonColor)
    {
        correctPresses += 1;
        if(correctPresses == numberOfColorsInPattern)
        {
            $("h2").html("Good job!")
            setTimeout(function(){
                continuePattern(currentRunningPattern);
            }, 1000)
            correctPresses = 0;
            playDing();
            return;
        }
    } else 
    {
        gameOver();
    }
});

// This is purely to animate the button press.
function buttonPressAnimation(color)
{
    switch(color)
    {
        case "red":
            $(".button.red").attr("src", "images/red-button2.svg");
            setTimeout(function(){
                $(".button.red").attr("src", "images/red-button1.svg");
            }, 200)
            playButtonSound(color);
            break;

        case "blue":
            $(".button.blue").attr("src", "images/blue-button2.svg");
            setTimeout(function(){
                $(".button.blue").attr("src", "images/blue-button1.svg");
            }, 200)
            playButtonSound(color);
            break;

        case "green":
            $(".button.green").attr("src", "images/green-button2.svg");
            setTimeout(function(){
                $(".button.green").attr("src", "images/green-button1.svg");
            }, 200)
            playButtonSound(color);
            break;

        case "yellow":
            $(".button.yellow").attr("src", "images/yellow-button2.svg");
            setTimeout(function(){
                $(".button.yellow").attr("src", "images/yellow-button1.svg");
            }, 200)
            playButtonSound(color);
            break;
    }
}

function playButtonSound(color)
{
    var soundsPath = "sounds/";
    var completePath = soundsPath + color + "-button-sound.mp3";
    var audio = new Audio(completePath);
    audio.play();
}

//This is a vital function for gameplay:
function continuePattern(currentPattern) 
{
    $("h2").html("Watch carefully, remember the pattern!");
    isDemoPlaying = true;
    var totalDelay = 0;

    if(currentPattern.length == 0)
    {
        totalDelay += repetitionDelay

        setTimeout(function(){
            var chosenColor = chooseRandomColor()
            currentPattern.push(chosenColor);
            buttonPressAnimation(chosenColor);
            console.log(currentPattern)
        }, totalDelay);

        totalDelay += repetitionDelay

        setTimeout(function(){
            $("h2").html("Now it's your turn: repeat the pattern!")
            isDemoPlaying = false;
        }, totalDelay)
        return;
    }

    currentPattern.forEach(function(color, index){
        totalDelay = repetitionDelay * (index + 1)
        setTimeout(function(){
            buttonPressAnimation(color);
            console.log("Played animation: " + color)
        }, totalDelay)
    });

    totalDelay += repetitionDelay

    setTimeout(function(){
        var chosenColor = chooseRandomColor()
        currentPattern.push(chosenColor);
        buttonPressAnimation(chosenColor);
        console.log(currentPattern)
    }, totalDelay)

    totalDelay += repetitionDelay

    setTimeout(function(){
        $("h2").html("Now it's your turn: repeat the pattern!")
        isDemoPlaying = false;
    }, totalDelay)
}

//This will just return a string:
function chooseRandomColor()
{
    var availableColors = ["red", "blue", "yellow", "green"];
    return availableColors[getRandomInt(availableColors.length)]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function gameOver()
{
    isGameOver = true;
    $("h2").html("Game Over! Refresh the page to try again!");

    var gameOverSound = new Audio("sounds/game-over.mp3");
    gameOverSound.play();
}

function playDing()
{
    var dingSound = new Audio("sounds/correct.mp3");
    dingSound.play();
}