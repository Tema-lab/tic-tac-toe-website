const loginBtn = document.getElementById("login-btn");
const userNameEl = document.getElementById("user-name");
const userPasswordEl = document.getElementById("user-password");
const loginErrorEl = document.getElementById("login-error");
const userProfile = document.getElementById("user-profile");
let formData = {};

const usersRegistered = JSON.parse(localStorage.getItem("users")) || [];
function loginUser(){
    formData = {
        userName: userNameEl.value,
        password: userPasswordEl.value
    };
    let currentUser = usersRegistered.find(user => user.userName === formData.userName);
    if(currentUser){
        sessionStorage.setItem("loggedUserId", JSON.stringify(currentUser.id));
    }
    if(usersRegistered.some(user => user.userName === formData.userName && user.password === formData.password)) {
        sessionStorage.setItem("loggedUser", JSON.stringify(formData.userName));

        loginErrorEl.innerHTML = "";
        userProfile.innerHTML = JSON.parse(sessionStorage.getItem("loggedUser"));
        window.location.href = "../index.html";
    }else{
        loginErrorEl.classList.add("login-error");
        loginErrorEl.innerHTML = "User does not exists";
    }
}

function setProfileName(){
    if(sessionStorage.getItem("loggedUser")){
        userProfile.innerHTML = JSON.parse(sessionStorage.getItem("loggedUser"));
    }
}

loginBtn.addEventListener("click", loginUser);

window.onload = function (){
    setProfileName();
}
