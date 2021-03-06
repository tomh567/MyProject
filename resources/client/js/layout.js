// layout

function pageLoad2() {
    hideContainer();
    hideContainerName();
    hideContainerFriends();
    hideContainerUploadPicture();
    document.getElementById('wishlistButton').addEventListener("click", layout);
    document.getElementById('addWishList').addEventListener("click", nameListContainer);
    document.getElementById('upload_button').addEventListener("click", addFriendContainer);
  //  document.getElementById('submitWishListName').addEventListener('click', createWebPageList);
  //  document.getElementById('addPicture').addEventListener("click", index);
}

//Wishlist Container Function

function layout(event) {
    event.stopPropagation();
    console.log("Wishlist Evoked");
    document.getElementById("wishListContainer").style.display = 'block';
}

function hideContainer() {
    document.addEventListener('mouseup', function (e) {
        let container = document.getElementById('wishListContainer');
        if(!container.contains(e.target)) {
            container.style.display = 'none';
        }

    })
}

// Name List Container

function nameListContainer(event) {
    event.stopPropagation();
    console.log("Name List Evoked");
    document.getElementById("create_List").style.display = 'block';
    document.getElementById("wishListContainer").style.display = 'none';
}

function hideContainerName() {
    document.addEventListener('mouseup', function (e) {
        let container = document.getElementById('create_List');
        if(!container.contains(e.target)) {
            container.style.display = 'none';
        }

    })
}

// Add Button
function addFriendContainer(event) {
    console.log("Add Button Initiated");

    let url = "/user/addButton";
        event.stopPropagation();
        console.log("Friend List Evoked");
        document.getElementById("addFriend").style.display = 'block';

}

function hideContainerFriends() {
    document.addEventListener('mouseup', function (e) {
        let container = document.getElementById('addFriend');
        if(!container.contains(e.target)) {
            container.style.display = 'none';
        }

    })
}

// Delete Account

// Upload a picture


// Webpage List

function newWebPage() {
    var x = document.forms["nameList"]["listName"].value;
    console.log("check 1");
    location.replace("WishList.html");
    document.getElementById("replaceName").value = document.getElementById('listName').innerHTML;

    if (x == "") alert("Please enter a name");
}

// check button press
function testButtonPress(event) {
    console.log("Name List Evoked");
    document.getElementById("uploadImage").style.display = 'block';
}

function hideContainerUploadPicture() {
    document.addEventListener('mouseup', function (e) {
        let container = document.getElementById('uploadImage');
        if(!container.contains(e.target)) {
            container.style.display = 'none';
        }

    })
}



