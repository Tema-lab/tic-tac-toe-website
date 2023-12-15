//login section
const emailEl = document.getElementById("user-email");
const passwordEl = document.getElementById("user-password");
const password2El = document.getElementById("user2-password-repeat");
const userNameEl = document.getElementById("user-name");
const registerBtn = document.getElementById("register-btn");
const emailErrorSpanEl = document.getElementById("email-error-span");
const userProfile = document.getElementById("user-profile");
const validEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
let formData = {};

function userRegistration(){
    let validationStatus = validateInputs();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if(validationStatus){
        if(!users.some((user) => user.email === formData.email || user.userName === formData.userName )){
            emailErrorSpanEl.innerHTML = "";
            users.push(formData);
            localStorage.setItem("users", JSON.stringify(users));
            window.location.href = "../pages/Login.html";
        }
        else{
            emailErrorSpanEl.innerHTML = "User is already registered";
        }
    }
}
const validateInputs = () =>{
    let userEmailValue = emailEl.value.trim();
    let userPassValue = passwordEl.value.trim();
    let userPass2Value = password2El.value.trim();
    let userNameValue = userNameEl.value.trim();

    let status = true;

    if(userNameValue === ""){
        setError(userNameEl, "Username is required");
        status = false;
    }else{
        setSuccess(userNameEl);
    }

    if(userEmailValue === ""){
        setError(emailEl, "Email is required");
        status = false;
    }else if(!isValidEmail(userEmailValue)){
        setError(emailEl, "Provide a valid email address");
        status = false;
    }else{
        setSuccess(emailEl);
    }

    if(userPassValue === ""){
        setError(passwordEl, "Password is required")
        status = false;
    }else if (userPassValue.length < 8){
        setError(passwordEl, "Password must be at least  8 characters");
        status = false;
    }else{
        setSuccess(passwordEl)
    }

    if(userPass2Value === ""){
        setError(password2El, "Please confirm your password");
        status = false;
    }else if(userPass2Value !== userPassValue){
        setError(passwordEl, "Passwords must match");
        status = false;
    }else{
        setSuccess(password2El);
    }
    formData = {
        email: userEmailValue,
        password: userPassValue,
        userName: userNameValue,
    }
    return status;
}
const isValidEmail = (email) =>{
    return email.match(validEmailRegex);
}
const setError = (el,mess) =>{
    const inputControl = el.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = mess;
    inputControl.classList.add("error");
    inputControl.classList.add("success");
}
const setSuccess = (el) =>{
    const inputControl = el.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
}

registerBtn.addEventListener("click", userRegistration);

function setProfileName(){
    if(sessionStorage.getItem("loggedUser")){
        userProfile.innerHTML = JSON.parse(sessionStorage.getItem("loggedUser"));
    }
}
window.onload = function (){
    setProfileName();
}
