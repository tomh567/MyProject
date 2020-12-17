

function index() {
    console.log("invoked index()");
    var fileInput = document.getElementById('the-file');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);

    const url = "/pictures/image";

    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.text()          //method returns a promise, have to return from here to get text
    }).then(response => {
        if (response.startsWith('Error')) {
            alert(response);
        } else {


        }
    });

    console.log("Wishlist Evoked");
    document.getElementById("pictureDetails").style.display = 'block';

    function finalUpload() {
        console.log("test for getting image stuff");
        var date = document.getElementById("imageDate");
        var comment = document.getElementById("imageComment");
        var name = document.getElementById("imageName");
        fetch("pictures/userImage", {
            method: "POST",
            body: formData, date, comment, name,
        }).then(response => {
            return response.text()          //method returns a promise, have to return from here to get text
        }).then(response => {
            if (response.startsWith('Error')) {
                alert(response);
            } else {
                formatPictureListUpload(response);

            }
        });
    }
}


function formatPictureListUpload(response) {
    console.log("Invoked pictures()");

    let dataHTML = "";

    for (let item of response) {

        dataHTML += `<div style="display: inline-block; width: 400px; item.ImagePath; margin: 10px; height: 300px;">`;
        dataHTML += `    <div><img style="max-width: 400px" src="${item.ImagePath}"></div>`;
        dataHTML += `    <div>${item.Comment}</div>`;
        dataHTML += `</div>`;

    }
    document.getElementById("picturesDiv").innerHTML = dataHTML;
}

function pageLoad() {
    console.log("Invoked pageLoad()");		//console.log your BFF for debugging client side
    const url = "/pictures/list";	// API method on webserver will be in Weight class with @Path of list

    fetch(url, {
        method: "GET",
    }).then(response => {
        return response.json();                 //return response to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) { //checks if response from server has a key "Error"
            alert(JSON.stringify(response));    // if it does, convert JSON object to string and alert
        } else {
            console.log(response);
            formatPictureList(response);
        }
    });

}

function formatPictureList(response) {
    console.log("Invoked pictures()");

    let dataHTML = "";

    for (let item of response) {

        dataHTML += `<div style="display: inline-block; width: 400px; item.ImagePath; margin: 10px; height: 300px;">`;
        dataHTML += `    <div><img style="max-width: 400px" src="${item.ImagePath}"></div>`;
        dataHTML += `    <div>${item.Comment}</div>`;
        dataHTML += `</div>`;

    }
    document.getElementById("picturesDiv").innerHTML = dataHTML;
}



