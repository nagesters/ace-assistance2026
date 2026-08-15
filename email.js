/* email js */

emailjs.init("GmEQZabPB9yUZMMuQ");

document
.getElementById("contact-form")
.addEventListener("submit", function(e){

    e.preventDefault();

    emailjs.sendForm(
        "service_hddfuwp",
        "template_ju8wenp",
        this
    )

    .then(function(){

        alert("Your inquiry has been submitted successfully!");

        document
        .getElementById("contact-form")
        .reset();

    })

    .catch(function(error){

        alert("Submission failed.");

        console.log(error);

    });

});