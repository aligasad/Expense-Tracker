
let loginUsername = localStorage.getItem("loginId");



function alreadyLogin() {
  if(loginUsername){
    window.location.href = 'mainPage.html';
  }
}
function checkLogin() {
  if(!loginUsername){
    window.location.href = 'index.html';
  }
}

