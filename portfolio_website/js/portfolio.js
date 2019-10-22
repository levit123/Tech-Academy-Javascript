// JavaScript source code

//causes all links on the webpage (navbar, etc.) to smoothly scroll in
$(document).ready(function () {
    $("a").on('click', function (event) {

        //checks to see if "this.Link" has a value; if it does, overrides that value
        if (this.Link !== "") {
            event.preventDefault();

            //store Link
            var Link = this.Link;

            //uses the "animate" method from the jQuery library to add smooth page scroll
            //the number (2000) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(Link).offset().top
            }, 2000, function () {
                //add Link (#) to URL when done scroll
                window.location.Link = Link;
            });
        }
    });
});

// These functions open and close the contact form 
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    this.Close();
}
