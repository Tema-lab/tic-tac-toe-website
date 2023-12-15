const userProfile = document.getElementById("user-profile");
function setProfileName(){
    if(sessionStorage.getItem("loggedUser")){
        userProfile.innerHTML = JSON.parse(sessionStorage.getItem("loggedUser"));
    }
}


window.onload = function (){
    setProfileName();
}
