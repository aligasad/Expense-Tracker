// if a user already login then he/she directed on mainPage
alreadyLogin();

const toggleDot = document.querySelector("#toggle");

const loginPage = document.querySelector("#loginPage");

const signUpPage = document.querySelector("#signUpPage");

const form1 = document.querySelector("#form1"); // Login Page
const form2 = document.querySelector("#form2"); // SignIn Page

const signUp = document.querySelector("#signUp"); 

const login = document.querySelector("#login");

const middleDiv = document.querySelector("#midDiv"); // for UI
const startBtn = document.querySelector('#startBtn');
const backgroundStyle = document.querySelector("#background-style");

startBtn.addEventListener('click', ()=>{
  loginPage.style.display = "block";
  middleDiv.style.display = "none";
});

const formElem = Array.from(document.forms[0].elements);
const formElem2 = Array.from(document.forms[1].elements);
formElem.pop();
formElem2.pop();

let arrInfo = [];
arrInfo = localStorage.getItem("userInfo") !== null ? JSON.parse(localStorage.getItem("userInfo")) : [];

signUp.addEventListener("click", () => {
  signUpPage.style.display = "block";

  loginPage.style.display = "none";
});

login.addEventListener('click', ()=>{
  signUpPage.style.display = "none";

  loginPage.style.display = "block";
})

// closeLoginPage.addEventListener("click", () => {
//   loginPage.style.display = "none";
// });

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {
    name: formElem2[0].value,
    phoneNumber: formElem2[1].value,
    email: formElem2[2].value,
    username: formElem2[3].value,
    password: formElem2[4].value,
  };

  console.log(obj);

  let flag = true;
  arrInfo.forEach((intObj) => {
    if (obj.username === intObj.username && obj.password === intObj.password) {
      flag = false;
    }
  });
  console.log(flag);

  if (flag === true) {
    arrInfo.push(obj);
    localStorage.setItem("userInfo", JSON.stringify(arrInfo));
    alert("SignUp Sucessfully! Please Login.");
    loginPage.style.display = "block";

    flag = false;
  } else {
    alert(
      "This email ID is already registered. Go to Login."
    );
  }

  signUpPage.style.display = "none";
  loginPage.style.display = "block";

});

form1.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = formElem[0].value;
  let password = formElem[1].value;
  let searchUser = arrInfo.find((user) => user.username == username && user.password == password);
  
  if(searchUser) {
    window.location.href = 'mainPage.html';
    localStorage.setItem("loginId", username);
  }

  if(!searchUser){
    alert("Invalid username or password.");
  }

});

function darkMode() {
  document.body.classList.toggle("dark-mode");
  toggleDot.classList.toggle("toggle");
  backgroundStyle.style.display = "none";
}

// localStorage.clear();
function loginDisplay() {
  loginPage.style.display = "block";
  middleDiv.style.display = "none";
}


// ---------{ B A C K G R O U N D - - - A N I M A T I O N }----------------------- */
const bgAnimation = document.getElementById('bgAnimation');
const numberOfColorBoxes = 400;
for (let i = 0; i < numberOfColorBoxes; i++) {
    const colorBox = document.createElement('div');
    colorBox.classList.add('colorBox');
    bgAnimation.append(colorBox)
}
// ---------------------------------------------------------------------------