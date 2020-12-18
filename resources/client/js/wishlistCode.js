function pageLoad() {
    hideAddRowContainer();
    document.getElementById('addRowButton').addEventListener('click', addRowContainer);
    document.getElementById('createWishListDetails').addEventListener('click', addRow);

}

function addRowContainer(event) {
    event.stopPropagation();
    console.log("Add Row Evoked");
    document.getElementById("addRowDetailsContainer").style.display = 'block';
}

function hideAddRowContainer() {
    document.addEventListener('mouseup', function (e) {
        let container = document.getElementById('addRowDetailsContainer');
        if(!container.contains(e.target)) {
            container.style.display = 'none';
        }

    })
}

// Add The Row
function addRow() {

    let container = document.getElementById('addRowDetailsContainer');
    container.style.display = 'none';

    var createHeadTable = true;
    console.log("Invoked Add Row");
    if (createHeadTable != true) {
        return;
    } else {
        let tableCollumns = "";
        tableCollumns +=
            '<tr>' +
                '<th>Type </th>' +
                '<th>Link </th>' +
                '<th>Price </th>' +
                '<th>Name </th>' +
            '</tr>';

        document.getElementById("tableSpace").innerHTML = tableCollumns;
        createHeadTable = false;
    }
}




// function formatPictureList(response) {
//     console.log("Invoked pictures()");
//
//     let dataHTML = "";
//
//     for (let item of response) {
//
//         dataHTML += `<div style="display: inline-block; width: 400px; item.ImagePath; margin: 10px; height: 300px;">`;
//         dataHTML += `    <div><img style="max-width: 400px" src="${item.ImagePath}"></div>`;
//         dataHTML += `    <div>${item.Comment}</div>`;
//         dataHTML += `</div>`;
//
//     }
//     document.getElementById("picturesDiv").innerHTML = dataHTML;
// }