// JavaScript source code
function Ride_Function() {
    var Height, Can_Ride;
    Height = document.getElementById("Height").value;
    Can_Ride = (Height < 52) ? "You are too short" : "You are tall enough";
    document.getElementById("ride").innerHTML = Can_Ride + " to ride";
}

function Vehicle(make, model, year, color) {
    this.Vehicle_Make = make;
    this.Vehicle_Model = model;
    this.Vehicle_Year = year;
    this.Vehicle_Color = color;
}
var Jack = new Vehicle("Dodge", "Viper", 2020, "Red");
var Emily = new Vehicle("Jeep", "Trail Hawk", 2019, "White and Black");
var Erik = new Vehicle("Ford", "Pinto", 1971, "Mustard");

function myFunction() {
    document.getElementById("Keywords_and_Constructors").innerHTML = "Erik drives a " + Erik.Vehicle_Color + "-colored " + Erik.Vehicle_Model + " manufactured in " + Erik.Vehicle_Year;
}

function monster(name, type, health, attack) {
    this.Monster_Name = name;
    this.Monster_Type = type;
    this.Monster_Health = health;
    this.Monster_Attack = attack;
}

var Imp = new monster("Imp", "Demon", 8, "Claws");

function getImp() {
    document.getElementById("New_and_This").innerHTML = "NAME: " + Imp.Monster_Name + " TYPE: " + Imp.Monster_Type + " HEALTH: " + Imp.Monster_Health + " ATTACK: " + Imp.Monster_Attack;
}

function countFunction() {
    document.getElementById("Nested_Function").innerHTML = Count();
    function Count() {
        var num = 7;
        function AddOne() {
            num += 1;
        }
        AddOne();
        return num;
    }
}