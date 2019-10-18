// JavaScript source code
//counts to five using a while loop
function countToFive() {
    var digit = "";
    var number = 1;
    //while loop counts to 5, and adds each number to "digit" string, which is displayed at the end of the function
    while (number < 6) {
        digit += "<br>" + number;
        number++;
    }
    //gets a specific line from the HTML documents and sends the output to it
    document.getElementById("counting_to_five").innerHTML = digit;
}

//defines several global variables to be used in the for loop
var instruments = ["Guitar", "Drums", "Piano", "Bass", "sp404sx", "Akai MPD 218", "Akai MPC Live"];
var content = "";
var counter;

//uses a for loop and gets the final result of the loop
function forLoop() {
    //for loop iterates through each instrument and adds it to "content" string, which is displayed at the end of the function
    for (counter = 0; counter < instruments.length; counter++) {
        content += instruments[counter] + "<br>";
    }
     //gets a specific line from the HTML documents and sends the output to it
    document.getElementById("instrumentsList").innerHTML = content;
}

//defines and gets the values of an array
function arrayFunction() {
    //initializes the array
    var artists = [];
    //defines the contents of the array
    artists[0] = "Biggie Smalls";
    artists[1] = "Tupac";
    artists[2] = "Nas";
    artists[3] = "Mos Def";

    //gets a specific line from the HTML documents and sends the output to it
    document.getElementById("array").innerHTML = "My favorite artist is " + artists[0] + ".";
}

//defines and gets the values of a constant object
function constantFunction() {
    //defines a constant object
    const musicalInstrument = {
        name: "sp404sx", type: "sampler", brand: "Roland", color: "grey"
    };

    //changes the "color" value of the object
    musicalInstrument.color = "blue";
    //adds a new value to the object, in the form of "price"
    musicalInstrument.price = "$499.99";

    //gets a specific line from the HTML documents and sends the output to it
    document.getElementById("constant").innerHTML = "The price of the " + musicalInstrument.color + " " + musicalInstrument.name + " is " + musicalInstrument.price;
}

//uses "let" to change the value of x but only in the braces below
var x = 223;
document.write(x);
{
    let x = 556;
    document.write("<br>" + x);
}
document.write("<br>" + x + "<br><br>");

//defines an object with global scope (using "let") named "videoCard"
let videoCard = {
    make: "Nvidia",
    model: "GTX",
    version: "1050Ti",
    vram: "4gb",
    description: function () {
        return "The video card is a " + this.make + " " + this.model + " " + this.version + " with " + this.vram + " of Vram.";
    }
};

//calls the "description" function from the "videoCard" object and gets it's return value
function getVideoCard() {
    document.getElementById("video_card_object").innerHTML = videoCard.description();
}