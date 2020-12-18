function pageLoad1() {
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
            pageLoad2();
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
        dataHTML += '<br />';

    }

    let oneInBox = "";

    for (let item of response) {
        oneInBox += '<div class="box_outer">';
        oneInBox += '<label>Your Friend <div id="friend_name"></div> Has recently uploaded<div id="update_number_of_posts"></div> Posts</label>';
        oneInBox += '<div id="picturesDiv"></div>'
        oneInBox += '</div>';
    }


    document.getElementById("picturesDiv").innerHTML = dataHTML;
}


function index() {
    console.log("invoked index()");
    var fileInput = document.getElementById('the-file');
    var file = fileInput.files[0];

    const formData = new FormData(document.getElementById('frmUploadImage'));

    formData.append('file', file);

    const url = "/pictures/upload";

    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.text()          //method returns a promise, have to return from here to get text
    }).then(response => {
        if (response.startsWith('Error')) {
            alert(response);
        } else {
            document.getElementById("frmUploadImage").style.display = 'block';
            console.log("Image uploaded successfully");
            pageLoad1() //to reload the page and show new image

        }
    });

}






function formatPictureListUpload(response) {
    console.log("Invoked pictures upload()");

    let dataHTML = "";

    for (let item of response) {

        dataHTML += `<div style="display: inline-block; width: 400px; item.ImagePath; margin: 10px; height: 300px;">`;
        dataHTML += `    <div><img style="max-width: 400px" src="${item.ImagePath}"></div>`;
        dataHTML += `    <div>${item.Comment}</div>`;
        dataHTML += `</div>`;

    }
    document.getElementById("picturesDiv").innerHTML = dataHTML;
}




