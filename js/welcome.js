"use strict";

const logOutBtn = document.querySelector("#loginBtn");
const welcomeMsg = document.querySelector("#welcomeMsg");
const savedMails = "savedMails";
let mailArr = [];
let foundMail;

if (localStorage.getItem(savedMails)) {
  mailArr = JSON.parse(localStorage.getItem(savedMails));
  foundMail = mailArr.find((mail) => mail.isLoggedIn == true);
  welcomeMsg.innerHTML = `Welcome ${foundMail.name}`;
}

const redirect = () => {
  window.location.href = "login.html";
};

logOutBtn.addEventListener("click", () => {
  foundMail.isLoggedIn = false;
  localStorage.setItem(savedMails, JSON.stringify(mailArr));
  redirect();
});
