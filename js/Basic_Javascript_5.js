// JavaScript source code
function displayType() {
    var num = 8;
    document.write(typeof num);
}

function getInfinity() {
    document.getElementById("infinity").innerHTML = 2E308;
}

function getNegInfinity() {
    document.getElementById("neginf").innerHTML = -2E308;
}

function booleanLogic() {
    document.write(6 > 3);
}

console.log(2 + 2);

function typeCoercion() {
    document.write("1" + 20);
}

function doubleEquals() {
    document.write(10 == 10);
    document.write(10 == 8);
}

function tripleEquals() {
    var x = 66;
    var y = "66";
    var z = 66;
    document.write(x === y);
    document.write(x === y);
}

function andComparison() {
    document.write(5 > 2 && 10 > 4);
    document.write(5 < 2 && 10 > 4);
}

function orComparison() {
    document.write(5 > 2 || 10 < 4);
    document.write(5 < 2 || 10 < 4);
}

function notComparison() {
    document.write(!(3 > 2));
    document.write(!(3 < 2));
}