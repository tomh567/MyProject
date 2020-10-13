"use strict";

function pageLoad() {

    console.log("Pageload Evoked")
    document.getElementById('loginForm').addEventListener("submit", processLogin);
    document.getElementById('signup').addEventListener("submit", processSignup);
    document.getElementById("magicButton").addEventListener("click", doSomeMagic);
    sixpictures();

}

function processSignup() {
    console.log("Signup Initiated");

    let url = "/user/signup";
}

function doSomeMagic(event) {
    alert("Button number " + event.target.dataset.banana + " was clicked");
}

function processLogin(event) {
    console.log("started event")
    event.preventDefault();

    console.log("Login form submitted... ");

    let url = "/user/login";
    let formData = new FormData(document.getElementById('loginForm'));

    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")
        ) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            Cookies.set("token", response.token);
            Cookies.set("username", response.username);
            window.open("reviews.html", "_self");       //open reviews.html in same tab
        }
    });

}

function sixpictures() {
        console.log("Invoked pictures()");		//console.log your BFF for debugging client side

        const url = "/pictures/topSix/";	// API method on webserver will be in Weight class with @Path of list

        fetch(url, {
            method: "GET",
        }).then(response => {
            return response.json();                 //return response to JSON
        }).then(response => {
            if (response.hasOwnProperty("Error")) { //checks if response from server has a key "Error"
                alert(JSON.stringify(response));    // if it does, convert JSON object to string and alert
            } else {
                console.log(responce);
                formatWeightList(response);          //this function will create an HTML table of the data (as we
                // did in lesson 2
            }
        });

}