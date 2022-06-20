"use strict";
window.addEventListener("DOMContentLoaded", newstart);
function newstart(){
document.querySelector("#form").addEventListener("submit", validateForm);

function validateForm(e){
  e.preventDefault();
  window.location = "/titlescreen.html";
  
}
}
