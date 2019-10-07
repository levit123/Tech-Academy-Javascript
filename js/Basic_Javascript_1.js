// JavaScript source code
var A = "The writing on the wall said \"There was a hole here. It's gone now\"";
var B = "Strangely, " + "this is never explained";
var Name1 = "James", Name2 = "Maria", Name3 = "Eddy";
var Name2 = Name2.fontcolor("Red");
window.alert(A);
document.write(B);
document.write(Name2);

function myFirstFunction() {
    var str = "This text is blue";
    var result = str.fontcolor("blue");
    document.getElementById("Blue_Text").innerHTML = result;
}