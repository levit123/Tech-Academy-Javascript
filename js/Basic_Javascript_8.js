// JavaScript source code
function fullSentence() {
    /* creates the different parts of the sentence */
    var sentence1 = "There was ";
    var sentence2 = "a hole here. ";
    var sentence3 = "It's gone now.";
    /* concatenates all the parts into one sentence */
    var sentenceFull = sentence1.concat(sentence2, sentence3);

    document.getElementById("concat_sent").innerHTML = sentenceFull;
}

function sliceString() {
    var sentence = "There was a hole here. It's gone now.";
    var section = sentence.slice(12, 16);
    document.getElementById("extract").innerHTML = section;
}

function convertToString() {
    var num = 556;
    document.getElementById("num_to_string").innerHTML = num.toString();
}

function precisionNumber() {
    var num = 5.563301013;
    document.getElementById("precision").innerHTML = num.toPrecision(3);
}