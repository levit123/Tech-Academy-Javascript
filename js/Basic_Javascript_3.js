// JavaScript source code
function addition() {
    var num1 = 2;
    var num2 = 1;
    num1 += num2;
    document.getElementById("add").innerHTML = "2 + 1 = " + num1;
}

function subtraction() {
    var num1 = 2;
    var num2 = 1;
    num1 -= num2;
    document.getElementById("sub").innerHTML = "2 - 1 = " + num1;
}

function multiplication() {
    var num = 2 * 3;
    document.getElementById("multi").innerHTML = "2 * 3 = " + num;
}

function division() {
    var num = 48 / 6;
    document.getElementById("divis").innerHTML = "48 / 6 = " + num;
}

function multiMath() {
    var num = (48 / 6) * 2 - (2 + 1);
    document.getElementById("math").innerHTML = "(48 / 6) * 2 - (2 + 1) = " + num;
}

function remainder() {
    var num = 25 % 6;
    document.getElementById("remain").innerHTML = "dividing 25 by 6 leaves a remainder of " + num;
}

function turnNegative() {
    var num = 8;
    document.getElementById("neg").innerHTML = -num;
}

function incrementNumber() {
    var num = 2;
    num++;
    document.getElementById("inc").innerHTML = "2 incremented is " + num;
}

function decrementNumber() {
    var num = 2;
    num--;
    document.getElementById("dec").innerHTML = "2 decremented is " + num;
}

function getRandomNumber() {
    window.alert(Math.random() * 50);
}