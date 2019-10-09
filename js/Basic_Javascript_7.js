// JavaScript source code
var globalNum = 3;

function localVariable() {
    var localNum = 2;
}

function debugTest() {
    console.log(localNum + 10);
}

function getDate() {
    if (new Date().getHours() < 18) {
        document.getElementById("greeting").innerHTML = "How are you today?";
    }
}

/* checks to see if person is of legal drinking age */
function drinkFunction() {
    /* gets the age from the input box in the HTML document */
    age = document.getElementById("enterNumber").value;
    if (age >= 21) {
        result = "You are old enough to drink. Be careful!";
    }
    else {
        result = "You are NOT old enough to drink";
    }
    /* returns the result string to the specified line in the HTML document */
    document.getElementById("ageCompare").innerHTML = result;
}

function timeFunction() {
    var time = new Date().getHours();
    var reply;

    if (time < 12 == time > 0) {
        reply = "Good morning my dudes";
    }
    else if (time > 12 == time < 18) {
        reply = "It is the afternoon";
    }
    else {
        reply = "Let's get lit tonight";
    }
    document.getElementById("time_of_day").innerHTML = reply;
}