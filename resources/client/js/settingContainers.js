function pageLoad() {
    hideEditContainer();
    hideClubContainer();
    hideDeleteContainer();
    hideDownloadContainer();
    document.getElementById('editDetails').addEventListener('click', editDetailsContainer);
    document.getElementById('settings_club').addEventListener('click', clubHistory);
    document.getElementById('createNewClubOption').addEventListener('click', createClubOption);
    document.getElementById('delete_account_icon').addEventListener('click', deleteAccount);
    document.getElementById('download_image_icon').addEventListener('click', downloadPictures);
}

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
