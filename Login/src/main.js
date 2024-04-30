function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");


    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        let inputBoxes = document.getElementById("login").getElementsByClassName("form__input");
        let input = Array.from(inputBoxes)
        let password;
        let username;
        
        input.forEach((entry) => {
            if(entry.type == "password") {
                password = entry.value;
            } else if(entry.type == "text") {
                username = entry.value;
            }
        })

        LoginDataCheck(loginForm, username, password);

    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});

function LoginDataCheck(loginForm, username, password) {
    FetchUserData("../../Assets/UserInfo/UserInfoAlex.json", username, password, loginForm)
    FetchUserData("../../Assets/UserInfo/UserInfoJon.json", username, password, loginForm)
    FetchUserData("../../Assets/UserInfo/UserInfoLogan.json", username, password, loginForm)
    FetchUserData("../../Assets/UserInfo/UserInfoTrevor.json", username, password, loginForm)
    FetchUserData("../../Assets/UserInfo/UserInfoAlicyn.json", username, password, loginForm)
    
    setFormMessage(loginForm, "error", "Invalid username/password combination");
}

async function FetchUserData(url, username, password, loginForm) {
    const response = await fetch(url);
    const userData = await response.json();

    if (userData.username == username && userData.password == password) {
        window.location.replace('../../index.html')
    }
}