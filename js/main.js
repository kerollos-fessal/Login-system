"use strict";
//declaring variables
const createAccount = document.querySelector("#createAccBtn");
const loginBtn = document.querySelector("#loginBtn");
const userName = document.querySelector("#nameInput");
const email = document.querySelector("#emailInput");
const password = document.querySelector("#passwordInput");
const confirmPassword = document.querySelector("#confirmPasswordInput");
const nameErr = document.querySelector("#nameErr");
const confirmPassErr = document.querySelector("#conPassErr");
const emailErr = document.querySelector("#emailErr");
const takenEmailErr = document.querySelector("#takenEmailErr");
const savedMails = "savedMails";
let mailArr = [];

//condition to get saved mails from local storage
if (localStorage.getItem(savedMails)) {
  mailArr = JSON.parse(localStorage.getItem(savedMails));
  let foundMail = mailArr.find((mail) => mail.isLoggedIn == true);
  if (foundMail) {
    window.location.href = "welcome.html";
  }
}

//sign up functions

// function to validate the user name
function userNameValidation() {
  const regex = /^[a-zA-Z0-9\s]+$/;
  if (regex.test(userName.value)) {
    userName.classList.add("is-valid");
    userName.classList.remove("is-invalid");
    nameErr.classList.replace("d-block", "d-none");
    return true;
  } else {
    userName.classList.add("is-invalid");
    userName.classList.remove("is-valid");
    nameErr.classList.replace("d-none", "d-block");
    return false;
  }
}

// function to validate the email
function emailValidation() {
  let foundMail = mailArr.find((mail) => email.value == mail.email);
  if (foundMail) {
    takenEmailErr.classList.replace("d-none", "d-block");
    email.classList.add("is-invalid");
    email.classList.remove("is-valid");
  } else {
    takenEmailErr.classList.replace("d-block", "d-none");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email.value)) {
      email.classList.add("is-valid");
      email.classList.remove("is-invalid");
      emailErr.classList.replace("d-block", "d-none");
      return true;
    } else {
      email.classList.add("is-invalid");
      email.classList.remove("is-valid");
      emailErr.classList.replace("d-none", "d-block");
      return false;
    }
  }
}

// function to validate the password
function confirmPassValidation() {
  if (password.value == "") {
    return;
  } else {
    if (password.value === confirmPassword.value) {
      confirmPassword.classList.add("is-valid");
      confirmPassword.classList.remove("is-invalid");
      confirmPassErr.classList.replace("d-block", "d-none");
      return true;
    } else {
      confirmPassword.classList.add("is-invalid");
      confirmPassword.classList.remove("is-valid");
      confirmPassErr.classList.replace("d-none", "d-block");
      return false;
    }
  }
}

confirmPassword.addEventListener("change", () => {
  confirmPassValidation();
});

userName.addEventListener("change", () => {
  userNameValidation();
});

email.addEventListener("change", () => {
  emailValidation();
});

const addUser = () => {
  if (confirmPassValidation() && userNameValidation() && emailValidation()) {
    let user = {
      name: userName.value,
      email: email.value,
      password: password.value,
      isLoggedIn: false,
    };
    mailArr.push(user);
    localStorage.setItem(savedMails, JSON.stringify(mailArr));
    clearInputs();
    redirect();
  }
};

createAccount.addEventListener("click", () => {
  addUser();
});

const clearInputs = () => {
  userName.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
};

const redirect = () => {
  window.location.href = "login.html";
};
