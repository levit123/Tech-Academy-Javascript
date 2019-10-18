// JavaScript source code
window.onload = function () { watch() };

function watch() {
    var btn = document.getElementById('btnStop');
    btnDisabled(btn); //disable the stop button since the game has not started
}

//this function will roll for random number twice, one for each player and determine which player won the roll
function rollForTurn() {
    var xArray = [];
    var ranNum = '';
    var minimum = 1;
    var maximum = 11;
    var first = "";
    var txt1 = "";
    for (var i = 0; i < 2; i++) {
        // random whole number between 1 and 10
        ranNum = Math.floor(Math.random() * (maximum - minimum) + minimum);
        xArray.push(ranNum);
    }
    diceRoll(); // play dice sounds during the game roll for turn
    // build the string to show which player rolled what die roll
    for (i = 0; i < xArray.length; i++) {
        var result = i + 1;
        var pOne = xArray[0];
        var pTwo = xArray[1];
        if (pOne == pTwo) { // rigging roll on tie to avoid bug in code. Need to address this later...
            pOne = 1;
            pTwo = 2;
        }
        txt1 = "Player 1 rolled [" + pOne + "]<br>";
        writeMsg(txt1);
        txt1 = txt1 + "Player 2 rolled [" + pTwo + "]<br><br>";
        setTimeout(function () { writeMsg(txt1); }, 1000); // time delay for dramatic affect
    }
    // determine and concatenate string showing which player won the roll
    if (pOne > pTwo) {
        first = "Player 1";
        setTimeout(function () { txt1 = txt1 + "Player 1 wins, please choose a square."; }, 2000);
        setTimeout(function () { writeMsg(txt1); }, 2000);
    } else if (pOne < pTwo) {
        first = "Player 2";
        setTimeout(function () { txt1 = txt1 + "Player 2 wins, please choose a square."; }, 2000);
        setTimeout(function () { writeMsg(txt1); }, 2000);
    }
    // pass which player won the roll
    return first;
}

//initiate the game, roll for turn and determine the active player
function startGame() {
    var xTurn = 0;
    activePlayer = rollForTurn();
    if (activePlayer == "") { // if it was a tie, then reroll
        activePlayer = rollForTurn();
    }
    setTimeout(function () { hideGameMsg(); }, 4000);

    // assign proper state of the control buttons
    var btn = document.getElementById('btnStart');
    btnDisabled(btn);  // disable the start button since the game is now afoot
    var btn = document.getElementById('btnStop');
    stopEnabled(btn);  // enable the stop button since the game is now afoot

    //Assign the Active Player to the console
    var showPlayer = document.getElementById('showPlayer')
    showPlayer.innerHTML = activePlayer;
    showPlayer.style.color = "green";
}

//this function styles the game buttons while they are disabled
function btnDisabled(btn) {
    btn.style.color = "fff";
    btn.style.border = "2px solid rgb(153, 153, 102)";
    btn.style.backgroundColor = "rgb(214, 214, 194)";
    btn.disabled = true;
}

//this function styles the game buttons while they are disabled
function stopEnabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(204, 0, 0)";
    btn.style.backgroundColor = "rgb(255, 51, 51)";
    btn.disabled = false;
}

//this function styles the game buttons while they are disabled
function startEnabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(0, 153, 0)";
    btn.style.backgroundColor = "rgb(57, 230, 0)";
    btn.disabled = false;
}

//when the user indicates, stop the current game and reset game
function stopGame() {
    //clear the text and hide message box
    hideGameMsg();
    var btn = document.getElementById('btnStart');
    //enable the start button since the game is now stopped
    startEnabled(btn);
    var btn = document.getElementById('btnStop');
    //disable the stop button since the game is now stopped
    btnDisabled(btn);
    var showPlayer = document.getElementById('showPlayer');
    showPlayer.innerHTML = "Game Stopped";
    showPlayer.style.color = 'red';

    //reset all squares to their starting empty state
    var arrayO = document.getElementsByClassName("O");
    var arrayX = document.getElementsByClassName("X");
    for (var i = 0; i < arrayO.length; i++) {
        arrayO[i].style.transform = "translateY(-100%)";
    }
    for (var i = 0; i < arrayX.length; i++) {
        arrayX[i].style.transform = "translateY(100%)";
    }
    //this clears the running log of all game moves
    document.getElementById('boardState').innerHTML = "";
}

//this function will show the message console and any text it may have
function showGameMsg() {
    document.getElementById('gameMsgBox').style.display = 'block';
}

//this function will conceal the message console from view
function hideGameMsg() {
    //clear the text from the message console
    clearMsg();
    //hide the div
    document.getElementById('gameMsgBox').style.display = "none";
}

//this function will write text to the game message console
function writeMsg(txt) {
    showGameMsg();
    document.getElementById('gameMsg').innerHTML = txt;
}

//this function will clear the text from the message console
function clearMsg() {
    document.getElementById('gameMsg').innerHTML = "";
}

//this function is for the player configuration panel and checks the proposed avatar assignments and prevents them from being the same
function saveSettings() {
    var player1Index = document.getElementById("player1").selectedIndex;
    var player1Selected = document.getElementById("player1").options;
    var player2Index = document.getElementById("player2").selectedIndex;
    var player2Selected = document.getElementById("player2").options;

    if (player1Selected[player1Index].text == player2Selected[player2Index].text) {
        alert("Error - Player 1 and Player 2 cannot both be assigned as: " + player1Selected[player1Index].text);
    } else {
        document.getElementById('player1Display').innerHTML = player1Selected[player1Index].text;
        document.getElementById('player2Display').innerHTML = player2Selected[player2Index].text;
    }
}

//this function returns the currently assigned avatar for each player
function getAvatars() {
    //gets the avatars of both players
    var player1Avatar = document.getElementById("player1Display").innerHTML;
    var player2Avatar = document.getElementById("player2Display").innerHTML;
    //puts both players avatars into a single array
    var avatarArray = [player1Avatar, player2Avatar];
    //retuns the array holding the players avatard
    return avatarArray;
}

//this function will return the active player's avatar
function determineAvatar() {
    //determines the correct avatar to paint for the active player
    var avatarArray = getAvatars();
    //gets active player
    var active = document.getElementById('showPlayer').innerHTML;
    player1Avatar = avatarArray[0];
    player2Avatar = avatarArray[1];

    //check which player is active and their corresponding avatar
    if (active == "Player 1") {
        var paintAvatar = player1Avatar;
    } else if (active == "Player 2") {
        var paintAvatar = player2Avatar;
    }
    //returned back the correct avatar
    return paintAvatar;
}

//this function changes active player over to the other player
function avatarPlaced() {
    var parseText = document.getElementById('gameMsg').innerHTML;
    // select the current element to memory
    var showPlayer = document.getElementById('showPlayer');
    //check if there is already a winner; if there is, then dont continue the game
    if (parseText == "That's three in a row, Player 1 wins!" || parseText == "That's three in a row, Player 2 wins!") {
        showPlayer.innerHTML = "Game Stopped";
        showPlayer.style.color = 'red';
    }
    //gets the current player from the element
    activePlayer = showPlayer.innerHTML;
    //once active player selects a square, change the active player
    if (activePlayer == "Player 1") {
        showPlayer.innerHTML = "Player 2";
    } else {
        showPlayer.innerHTML = "Player 1";
    }
    //calls this function to check if there was a tie
    checkForTie();
}

//this function will get the array of the current board and check the proposed move to see if it's valid
function check(info, square) {
    for (var i in info) {
        //comparing index of square
        var tempInfo = info[i].charAt(0);
        if (tempInfo == square) {
            return tempInfo;
        }
    }
}

//as squares are selected they check in with this function to see if that particular square has already been assigned and if it hasn't, record new square with the assigned avatar
function recordMoves(square) {
    var proposedMove = square;
    //retrieve boardState array
    var boardState = document.getElementById('boardState').innerHTML;
    //seperate the string by commas to create an array
    var info = boardState.split(',');
    //call function to check if the proposed square is already occupied
    verdict = check(info, square);
    return verdict;
}

//this function will get a list of previous moves and then concatenate the current move to it
function recordMove(currentMove) {
    var target = document.getElementById('boardState');
    var previousMoves = target.innerHTML;
    target.innerHTML = previousMoves + currentMove;
}

function checkForWinCon() {
    var squareArray = [];
    var target = document.getElementById('boardState');
    //raw array with squares and avatars
    var info = target.innerHTML;
    //remove leading comma
    info = info.substring(1);
    //seperate the string by commas into an array
    info = info.split(',');

    //sort the square array in order despite the actual gameplay sequence
    info.sort();

    for (var i in info) {
        //new array with only squares not avatars
        squareArray.push(info[i].charAt(0));
    }

    //call this following array of function to check for any of the possible win conditions
    checkWinCon1(info, squareArray);
    checkWinCon2(info, squareArray);
    checkWinCon2(info, squareArray);
    checkWinCon3(info, squareArray);
    checkWinCon4(info, squareArray);
    checkWinCon5(info, squareArray);
    checkWinCon6(info, squareArray);
    checkWinCon7(info, squareArray);
    checkWinCon8(info, squareArray);

    //console.log("New CHECK: "+document.getElementById('gameMsg').innerHTMLs);
    checkForTie();
}

// whenever a win is detected the corresponding function will call this function to produce the following winning process for the game
function winner(winDetected, winCon) {
    if (winDetected == "win") {
        var showme = winDetected;
        var activePlayer = document.getElementById('showPlayer').innerHTML;
        var txt2 = "That's three in a row, " + activePlayer + " wins!";
        writeMsg(txt2);
        var btn = document.getElementById('btnStart');
        startEnabled(btn); // enable the start button since the game is now stopped
        var btn = document.getElementById('btnStop');
        btnDisabled(btn); // disable the stop button since the game is now stopped
        document.getElementById('showPlayer').innerHTML = "Game Stopped";
        glowBoard(winCon); // call function to make the gameboard pulse with colors
    }
}

function checkForTie() {
    var boardState = document.getElementById('boardState').innerHTML;
    //remove leading comma
    boardState = boardState.substring(1);
    //seperate the string by commas into an array
    boardState = boardState.split(',');
    var check = document.getElementById('gameMsg').innerHTML;

    if (boardState.length >= 9 && check != "That's three in a row, Player 1 wins!" && check != "That's three in a row, Player 2 wins!") {
        var txt1 = "Oh no! Nobody wins, it was a tie!";
        //play a sound when a tie has been detected
        tieSound();
        writeMsg(txt1);
        setTimeout(function () {
            stopGame();
        }, 3000);
    }
}

//makes the winning squares light up in celebration
function glowBoard(pos) {
    var index0 = pos[0];
    var index1 = pos[1];
    var index2 = pos[2];
    var squares = document.getElementsByClassName('square')
    for (var i = 0; i < squares.length; i++) {
        if (i == index0) {
            var bg1 = squares[i];
            blink();
            winSound();
            setTimeout(function () { bg1.style.backgroundColor = 'rgb(244, 179, 66)'; }, 100);
            setTimeout(function () { bg1.style.backgroundColor = 'rgb(244, 238, 66)'; }, 200);
            setTimeout(function () { bg1.style.backgroundColor = 'rgb(197, 244, 66)'; }, 300);
            setTimeout(function () { bg1.style.backgroundColor = 'rgb(122, 244, 66)'; }, 400);
            setTimeout(function () { bg1.style.backgroundColor = 'rgb(66, 244, 235)'; }, 500);
            setTimeout(function () { bg1.style.backgroundColor = 'rgb(244, 179, 66)'; }, 600);
            setTimeout(function () { bg1.style.backgroundColor = 'rgb(244, 238, 66)'; }, 700);
            setTimeout(function () { bg1.style.backgroundColor = 'rgb(197, 244, 66)'; }, 800);
            setTimeout(function () { bg1.style.backgroundColor = 'rgb(122, 244, 66)'; }, 900);
            setTimeout(function () { bg1.style.backgroundColor = 'rgb(66, 244, 235)'; }, 1000);
            setTimeout(function () { bg1.style.backgroundColor = '#d7f3f7'; }, 1100);
        } else if (i == index1) {
            var bg2 = squares[i];
            setTimeout(function () { bg2.style.backgroundColor = 'rgb(66, 244, 235)'; }, 100);
            setTimeout(function () { bg2.style.backgroundColor = 'rgb(122, 244, 66)'; }, 200);
            setTimeout(function () { bg2.style.backgroundColor = 'rgb(197, 244, 66)'; }, 300);
            setTimeout(function () { bg2.style.backgroundColor = 'rgb(244, 238, 66)'; }, 400);
            setTimeout(function () { bg2.style.backgroundColor = 'rgb(244, 179, 66)'; }, 500);
            setTimeout(function () { bg2.style.backgroundColor = 'rgb(66, 244, 235)'; }, 600);
            setTimeout(function () { bg2.style.backgroundColor = 'rgb(122, 244, 66)'; }, 700);
            setTimeout(function () { bg2.style.backgroundColor = 'rgb(197, 244, 66)'; }, 800);
            setTimeout(function () { bg2.style.backgroundColor = 'rgb(244, 238, 66)'; }, 900);
            setTimeout(function () { bg2.style.backgroundColor = 'rgb(244, 179, 66)'; }, 1000);
            setTimeout(function () { bg2.style.backgroundColor = '#d7f3f7'; }, 1100);
        } else if (i == index2) {
            var bg3 = squares[i];
            setTimeout(function () { bg3.style.backgroundColor = 'rgb(244, 179, 66)'; }, 100);
            setTimeout(function () { bg3.style.backgroundColor = 'rgb(244, 238, 66)'; }, 200);
            setTimeout(function () { bg3.style.backgroundColor = 'rgb(197, 244, 66)'; }, 300);
            setTimeout(function () { bg3.style.backgroundColor = 'rgb(122, 244, 66)'; }, 400);
            setTimeout(function () { bg3.style.backgroundColor = 'rgb(66, 244, 235)'; }, 500);
            setTimeout(function () { bg3.style.backgroundColor = 'rgb(244, 179, 66)'; }, 600);
            setTimeout(function () { bg3.style.backgroundColor = 'rgb(244, 238, 66)'; }, 700);
            setTimeout(function () { bg3.style.backgroundColor = 'rgb(197, 244, 66)'; }, 800);
            setTimeout(function () { bg3.style.backgroundColor = 'rgb(122, 244, 66)'; }, 900);
            setTimeout(function () { bg3.style.backgroundColor = 'rgb(66, 244, 235)'; }, 1000);
            setTimeout(function () { bg3.style.backgroundColor = '#d7f3f7'; }, 1100);
        }
    }
    setTimeout(function () { stopGame(); }, 1200);
}

// these functions will produce game sounds depending on the occasion
function squareSound() {
    var sound = document.getElementById("placeAvatar");
    sound.play();
    setTimeout(function () { sound.pause(); }, 400); // add delay to these to keep sound short
    setTimeout(function () { sound.currentTime = 0; }, 500);
}

//plays a tie game sound
function tieSound() {
    var sound = document.getElementById("tieGame");
    var check = document.getElementById('gameMsg').innerHTML;
    setTimeout(function () { sound.play(); }, 500);
}

//plays a winning sound
function winSound() {
    var sound = document.getElementById("winGame");
    setTimeout(function () { sound.play(); }, 500);
    setTimeout(function () { sound.pause(); }, 2700); // add delay to these to keep sound short
    setTimeout(function () { sound.currentTime = 0; }, 2800);
}
//plays a dice roll sound
function diceRoll() {
    var sound = document.getElementById("diceRoll");
    sound.play();
}

// call this function to make entire background color 
// flash for a few seconds for a win animation
function blink() {
    var body = document.getElementById('body');
    setTimeout(function () { body.style.backgroundColor = '#94f7ed'; }, 100);
    setTimeout(function () { body.style.backgroundColor = '#94cef7'; }, 200);
    setTimeout(function () { body.style.backgroundColor = '#94a6f7'; }, 300);
    setTimeout(function () { body.style.backgroundColor = '#b094f7'; }, 400);
    setTimeout(function () { body.style.backgroundColor = '#cc94f7'; }, 500);
    setTimeout(function () { body.style.backgroundColor = '#e894f7'; }, 600);
    setTimeout(function () { body.style.backgroundColor = '#f794d9'; }, 700);
    setTimeout(function () { body.style.backgroundColor = '#f73881'; }, 800);
    setTimeout(function () { body.style.backgroundColor = '#c6034e'; }, 900);
    setTimeout(function () { body.style.backgroundColor = '#e00202'; }, 1000);
    setTimeout(function () { body.style.backgroundColor = '#ffffff'; }, 1100);
}

// checking for wincon squares 012
function checkWinCon1(info, squareArray) {
    var winDetected = "on";
    var winCon1 = [0, 1, 2];
    // iterate through the growing array during 
    // gametime searching for the existence of 
    // index 0, index 1 and index 2 and once they
    // they do appear in the array, record their 
    // avatars and compare all 3 for win cons
    for (var i in info) {
        if (info[i].charAt(0) == "0") {
            var match0Avatar = info[i].charAt(1); // only interested in recording the avatar
        }
        if (info[i].charAt(0) == "1") {
            var match1Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "2") {
            var match2Avatar = info[i].charAt(1);
        }
    }
    // this will trigger (ONLY) if there was a match for index0, index1, and index2
    if (match0Avatar != undefined && match1Avatar != undefined && match2Avatar != undefined) {
        if (match0Avatar == match1Avatar && match0Avatar == match2Avatar) {
            winDetected = "win"; // this flag will pass when a win has been detected
            winner(winDetected, winCon1);
            return;
        }
    }
    winner(winDetected, winCon1); // winCon1 is the array of win combo
}

// checking for wincon squares 345
function checkWinCon2(info, squareArray) {
    var winCon2 = [3, 4, 5];
    var winDetected = "on";
    for (var i in info) {
        if (info[i].charAt(0) == "3") {
            var match3Avatar = info[i].charAt(1); // only interested in recording the avatar
        }
        if (info[i].charAt(0) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "5") {
            var match5Avatar = info[i].charAt(1);
        }
    }
    if (match3Avatar != undefined && match4Avatar != undefined && match5Avatar != undefined) { // this will trigger (ONLY) if there was a match for index3, index4, and index5
        if (match3Avatar == match4Avatar && match3Avatar == match5Avatar) {
            winDetected = "win";
        }
    }
    winner(winDetected, winCon2);
}

// checking for wincon squares 678
function checkWinCon3(info, squareArray) {
    var winCon3 = [6, 7, 8];
    var winDetected = "on";
    for (var i in info) {
        if (info[i].charAt(0) == "6") {
            var match6Avatar = info[i].charAt(1); // only interested in recording the avatar
        }
        if (info[i].charAt(0) == "7") {
            var match7Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "8") {
            var match8Avatar = info[i].charAt(1);
        }
    }
    if (match6Avatar != undefined && match7Avatar != undefined && match8Avatar != undefined) {
        if (match6Avatar == match7Avatar && match6Avatar == match8Avatar) {
            winDetected = "win";
        }
    }
    winner(winDetected, winCon3);
}

// checking for wincon squares 036
function checkWinCon4(info, squareArray) {
    var winCon4 = [0, 3, 6];
    var winDetected = "on";
    for (var i in info) {
        if (info[i].charAt(0) == "0") {
            var match0Avatar = info[i].charAt(1); // only interested in recording the avatar
        }
        if (info[i].charAt(0) == "3") {
            var match3Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "6") {
            var match6Avatar = info[i].charAt(1);
        }
    }
    if (match0Avatar != undefined && match3Avatar != undefined && match6Avatar != undefined) {
        if (match0Avatar == match3Avatar && match0Avatar == match6Avatar) {
            winDetected = "win";
        }
    }
    winner(winDetected, winCon4);
}

// checking for wincon squares 147
function checkWinCon5(info, squareArray) {
    var winCon5 = [1, 4, 7];
    var winDetected = "on";
    for (var i in info) {
        if (info[i].charAt(0) == "1") {
            var match1Avatar = info[i].charAt(1); // only interested in recording the avatar
        }
        if (info[i].charAt(0) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "7") {
            var match7Avatar = info[i].charAt(1);
        }
    }
    if (match1Avatar != undefined && match4Avatar != undefined && match7Avatar != undefined) {
        if (match1Avatar == match4Avatar && match1Avatar == match7Avatar) {
            winDetected = "win";
        }
    }
    winner(winDetected, winCon5);
}

// checking for wincon squares 258
function checkWinCon6(info, squareArray) {
    var winCon6 = [2, 5, 8];
    var winDetected = "on";
    for (var i in info) {
        if (info[i].charAt(0) == "2") {
            var match2Avatar = info[i].charAt(1); // only interested in recording the avatar
        }
        if (info[i].charAt(0) == "5") {
            var match5Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "8") {
            var match8Avatar = info[i].charAt(1);
        }
    }
    if (match2Avatar != undefined && match5Avatar != undefined && match8Avatar != undefined) {
        if (match2Avatar == match5Avatar && match2Avatar == match8Avatar) {
            winDetected = "win";
        }
    }
    winner(winDetected, winCon6);
}

// checking for wincon squares 642
function checkWinCon7(info, squareArray) {
    var winCon7 = [6, 4, 2];
    var winDetected = "on";
    for (var i in info) {
        if (info[i].charAt(0) == "6") {
            var match6Avatar = info[i].charAt(1); // only interested in recording the avatar
        }
        if (info[i].charAt(0) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "2") {
            var match2Avatar = info[i].charAt(1);
        }
    }
    if (match6Avatar != undefined && match4Avatar != undefined && match2Avatar != undefined) {
        if (match6Avatar == match4Avatar && match6Avatar == match2Avatar) {
            winDetected = "win";
        }
    }
    winner(winDetected, winCon7);
}

// checking for wincon squares 048
function checkWinCon8(info, squareArray) {
    var winCon8 = [0, 4, 8];
    var winDetected = "on";
    for (var i in info) {
        if (info[i].charAt(0) == "0") {
            var match0Avatar = info[i].charAt(1); // only interested in recording the avatar
        }
        if (info[i].charAt(0) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "8") {
            var match8Avatar = info[i].charAt(1);
        }
    }
    if (match0Avatar != undefined && match4Avatar != undefined && match8Avatar != undefined) {
        if (match0Avatar == match4Avatar && match0Avatar == match8Avatar) {
            winDetected = "win";
        }
    }
    winner(winDetected, winCon8);
}

//these functions are for each click event of their corresponding square element
function square1Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;

    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "0"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);

        if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[0]; // paint avatar

            if (paintAvatar == "O") { // change these all to ternary satetments instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }

            // build new array adding the newly selected square and the assigned avatar
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition.
            avatarPlaced(square, paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}

function square2Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;

    //if game has not yet started, prevent avatar placement
    if (activePlayer != "Game Stopped") {
         // identify the square selected
		var square = "1";
		// check if the proposed square is valid
        var verdict = recordMoves(square);
        // if verdict is empty than the square is unoccupied.

        // get the correct avatar to paint for the active player
		if (verdict == undefined) {
            var paintAvatar = determineAvatar();
             // paint avatar
            var selected = document.getElementsByClassName(paintAvatar)[1];

            // change these all to ternary satetments instead
            if (paintAvatar == "O") {
                // call function to animate O
				animateO(selected);
            } else if (paintAvatar == "X") {
                 // call function to animate X
				animateX(selected);
            }

			// build new array adding the newly selected square and the assigned avatar
			var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            // call function to check if current move completes a winning condition.
            checkForWinCon();
            // end current turn and pass the turn to the other player
            avatarPlaced(square, paintAvatar);
            // play a game sound when the avatar is placed
			squareSound();
		}
	}
}

function square3Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "2"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[2]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary satetments instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition.
            avatarPlaced(square, paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}

function square4Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "3"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[3]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary satetments instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition.
            avatarPlaced(square, paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}

function square5Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "4"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[4]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary satetments instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition.
            avatarPlaced(square, paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}

function square6Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "5"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[5]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary satetments instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition.
            avatarPlaced(square, paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}

function square7Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "6"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[6]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary satetments instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition.
            avatarPlaced(square, paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}

function square8Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "7"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[7]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary satetments instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition.
            avatarPlaced(square, paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}

function square9Animate() {
    var activePlayer = document.getElementById('showPlayer').innerHTML;
    if (activePlayer != "Game Stopped") { // if game has not yet started prevent avatar placement
        var square = "8"; // identify the square selected
        // check if the proposed square is valid
        var verdict = recordMoves(square);
        if (verdict == undefined) { // if verdict is empty than the square is unoccupied.
            var paintAvatar = determineAvatar(); // get the correct avatar to paint for the active player
            var selected = document.getElementsByClassName(paintAvatar)[8]; // paint avatar
            if (paintAvatar == "O") { // change these all to ternary satetments instead
                animateO(selected); // call function to animate O
            } else if (paintAvatar == "X") {
                animateX(selected); // call function to animate X
            }
            // build new array adding the newly selected square and the assigned avatar
            var currentMove = "," + square + paintAvatar;
            recordMove(currentMove);
            checkForWinCon(); // call function to check if current move completes a winning condition.
            avatarPlaced(square, paintAvatar); // end current turn and pass the turn to the other player
            squareSound(); // play a game sound when the avatar is placed
        }
    }
}

//plays the animation for the O avatar.
function animateO(selected) {
    selected.style.transform = (selected.style.transform == "translateY(0%)" || null) ? "translateY(0%)" : "translateY(0%)";
}

//plays the animation for the X avatar.
function animateX(selected) {
    selected.style.transform = (selected.style.transform == "translateY(-100%)" || null) ? "translateY(0%)" : "translateY(-100%)";
}