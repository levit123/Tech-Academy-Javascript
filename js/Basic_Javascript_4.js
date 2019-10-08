// JavaScript source code
var imp = {
    Health: 10,
    Attack1: "Claws",
    Attack2: "Fireball",
    Sound: "Screech!"
};

function impAttack1() {
    document.getElementById("dictionary").innerHTML = "The imp attacks with " + imp.Attack1;
}