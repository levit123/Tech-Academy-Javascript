// JavaScript source code
function seasonFunction() {
    var result;
    var seasons = document.getElementById("season_choice").value;
    switch (seasons) {
        case "Spring":
            result = "Spring is nice, perfect temperature.";
            break;
        case "Summer":
            result = "Summer is nice but it can get too hot.";
            break;
        case "Fall":
            result = "Fall is nice, quite romantic.";
            break;
        case "Winter":
            result = "Winter is nice, as long as you're warm and have a cup of hot chocolate.";
            break;
        default:
            result = "Please enter a season exactly as written above.";
    }
    document.getElementById("output").innerHTML = result;
}

function changeLine() {
    var x = document.getElementsByClassName("change");
    x[0].innerHTML = "I regret this change";
}