// JavaScript source code
//displays info pulled from custom data attributes in the list of Wildhammer characters in the HTML document
function displayInfo(character) {
    //defines the status/rank of a clan member, pulled from the custom data attribute "data-clan_relation"
    var status = character.getAttribute("data-clan_relation");
    //displays an alert with the character's info
    alert(character.innerHTML + " is the " + status + " of the Wildhammer Clan.");
}