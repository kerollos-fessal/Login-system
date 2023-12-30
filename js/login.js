"use strict";

const loginBtn = document.querySelector("#loginBtn");
const email = document.querySelector("#loginEmailInput");
const password = document.querySelector("#loginPasswordInput");
const matchErr = document.querySelector("#matchErr");
const savedMails = "savedMails";
let mailArr = [];

if (localStorage.getItem(savedMails)) {
  mailArr = JSON.parse(localStorage.getItem(savedMails));
}

const validateLogin = () => {
  let foundMail = mailArr.find(
    (mail) => email.value == mail.email && password.value == mail.password
  );
  if (foundMail) {
    foundMail.isLoggedIn = true;
    localStorage.setItem(savedMails, JSON.stringify(mailArr));
    return true;
  } else {
    return false;
  }
};

const redirect = () => {
  window.location.href = "welcome.html";
};

loginBtn.addEventListener("click", () => {
  if (validateLogin()) {
    matchErr.classList.replace("d-block", "d-none");
    redirect();
  } else {
    matchErr.classList.replace("d-none", "d-block");
    return;
  }
});
