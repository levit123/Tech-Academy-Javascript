// JavaScript source code
function countToFive() {
    var digit = "";
    var number = 1;
    while (number < 6) {
        digit += "<br>" + number;
        number++;
    }
    document.getElementById("counting_to_five").innerHTML = digit;
}

var instruments = ["Guitar", "Drums", "Piano", "Bass", "sp404sx", "Akai MPD 218", "Akai MPC Live"];
var content = "";
var counter;

function forLoop() {
    for (counter = 0; counter < instruments.length; counter++) {
        content += instruments[counter] + "<br>";
    }
    document.getElementById("instrumentsList").innerHTML = content;
}

function arrayFunction() {
    var artists = [];
    artists[0] = "Biggie Smalls";
    artists[1] = "Tupac";
    artists[2] = "Nas";
    artists[3] = "Mos Def";

    document.getElementById("array").innerHTML = "My favorite artist is " + artists[0] + ".";
}

function constantFunction() {
    const musicalInstrument = {
        name: "sp404sx", type: "sampler", brand: "Roland", color: "grey"
    };

    musicalInstrument.color = "blue";
    musicalInstrument.price = "$499.99";

    document.getElementById("constant").innerHTML = "The price of the " + musicalInstrument.color + " " + musicalInstrument.name + " is " + musicalInstrument.price;
}

var x = 223;
document.write(x);
{
    let x = 556;
    document.write("<br>" + x);
}
document.write("<br>" + x + "<br><br>");

let videoCard = {
    make: "Nvidia",
    model: "GTX",
    version: "1050Ti",
    vram: "4gb",
    description: function () {
        return "The video card is a " + this.make + " " + this.model + " " + this.version + " with " + this.vram + " of Vram.";
    }
};

function getVideoCard() {
    document.getElementById("video_card_object").innerHTML = videoCard.description();
}