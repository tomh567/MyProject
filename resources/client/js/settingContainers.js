function pageLoad() {
    hideEditContainer();
    hideClubContainer();
    hideDeleteContainer();
    hideDownloadContainer();
    hidePrivacyChange();
    document.getElementById('editDetails').addEventListener('click', editDetailsContainer);
    document.getElementById('settings_club').addEventListener('click', clubHistory);
    document.getElementById('createNewClubOption').addEventListener('click', createClubOption);
    document.getElementById('delete_account_icon').addEventListener('click', deleteAccount);
    document.getElementById('download_image_icon').addEventListener('click', downloadPictures);
    document.getElementById('deleteAccountButton').addEventListener('click', deleteWarn);
    document.getElementById('accountPrivacyButton').addEventListener('click', changePrivacy);
    document.getElementById('containerPadlockOpen').addEventListener('click', publicButton);
    document.getElementById('containerPadlockClosed').addEventListener('click', privateButton);
}

// Variables
let finalDelete = false;

// Edit Container
function editDetailsContainer(event) {
    event.stopPropagation();
    console.log("Edit Details Evoked");
    document.getElementById("editDetailsContainer").style.display = 'block';
}

function hideEditContainer() {
    document.addEventListener('mouseup', function (e) {
        let container = document.getElementById('editDetailsContainer');
        if(!container.contains(e.target)) {
            container.style.display = 'none';
        }

    })
}

// Club History
function clubHistory(event) {
    event.stopPropagation();
    console.log("club Details Evoked");
    document.getElementById("addClubHistory").style.display = 'block';
}

function hideClubContainer() {
    document.addEventListener('mouseup', function (e) {
        let container = document.getElementById('addClubHistory');
        if(!container.contains(e.target)) {
            container.style.display = 'none';
        }

    })
}

function createClubOption() {
    document.getElementById('pClub1').value = "Camberley";
}

// Delete Account
function deleteAccount(event) {
    event.stopPropagation();
    console.log("Delete Details Evoked");
    document.getElementById("deleteAccountContainer").style.display = 'block';
}

function hideDeleteContainer() {
    document.addEventListener('mouseup', function (e) {
        let container = document.getElementById('deleteAccountContainer');
        if(!container.contains(e.target)) {
            container.style.display = 'none';
        }

    })
}

function deleteWarn() {
    alert("Final Warning: Are you sure you are willing to delete your account. All pictures will be removes from your it!");
    finalDelete = true;
    deleteAccountFinal();
}

function deleteAccountFinal() {
    alert("This feature is in maintenence");
    finalDelete = false;
}


// Download Pictures
function downloadPictures(event) {
    event.stopPropagation();
    console.log("Download Pictures Container Initiated");
    document.getElementById('downloadPictures').style.display = 'block';
}

function hideDownloadContainer() {
    document.addEventListener('mouseup', function (e) {
        let container = document.getElementById('downloadPictures');
        if(!container.contains(e.target)) {
            container.style.display = 'none';
        }

    })
}

// Privacy Container
function changePrivacy(event) {
    event.stopPropagation();
    console.log("Privacy Settings Container Initiated");
    document.getElementById('accountPrivacy').style.display = 'block';
}

function hidePrivacyChange() {
    document.addEventListener('mouseup', function (e) {
        let container = document.getElementById('accountPrivacy');
        if(!container.contains(e.target)) {
            container.style.display = 'none';
        }

    })
}

function publicButton() {
    document.getElementById('public_or_private').innerHTML = "Public";
}

function privateButton() {
    document.getElementById('public_or_private').innerHTML = "Private";
}



