



function uploadImage() {
    console.log("invoked uploadImage()");
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


            }
        });
    }
}


