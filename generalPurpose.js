const ctx = document.getElementById("myChart");
const form = document.querySelector("form");
const dataContainer = document.querySelector("#dataContainer");
let leaderBoard = localStorage.getItem("leaderBoard") ? JSON.parse(localStorage.getItem("leaderBoard")) : [];
const elements = Array.from(document.forms[0].elements);
let myChart = null;
let uniqueId = 1;

window.addEventListener("load",()=>{
   printLeaderBoard();
   showGraph();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {
    id: uniqueId,
    name: elements[0].value,
    amount: elements[1].value,
    item: elements[2].value,
  };

  uniqueId++;
  // adding data into leaderBoard
  leaderBoard.push(obj);
  localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard));

  // showing pie char according to its data
  showGraph();

  // clearing the form
  clearForm();

  // sorting the leaderBoard
  sortLeaderBoard();

  // print values on the DOM
  printLeaderBoard();
});

function printLeaderBoard() {
  dataContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  
  leaderBoard.forEach((obj) => {
    const dataDiv = document.createElement("div");
    dataDiv.classList.add("dataDiv");
    const leftDiv = document.createElement("div");
    const para = document.createElement("p");
    para.innerText = `${obj.name}: ${obj.amount} ${obj.item}`;
    const rightDiv = document.createElement("div");
    const edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.classList.add("edit");
    edit.addEventListener("click", () => {
      elements[0].value = obj.name;
      elements[1].value = obj.amount;
      elements[2].value = obj.item;

      deleteData(obj.id);
    });

    const del = document.createElement("button");
    del.innerText = "Delete";
    del.classList.add("deleteData");
    del.addEventListener("click", () => deleteData(obj.id));

    rightDiv.append(edit, del);
    leftDiv.append(para);
    dataDiv.append(leftDiv, rightDiv);
    fragment.append(dataDiv);
  });
  dataContainer.append(fragment);
}

function showGraph() {
  let data = Object.groupBy(leaderBoard, ({ item }) => item);
  console.log(data);

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          data: Object.values(data).map((cat) =>
            cat.reduce((start, cur) => start + Number(cur.amount), 0)
          ),
          borderWidth: 1,
        },
      ],
    },
  });
}

function clearForm() {
  elements.forEach((elem) => {
    elem.value = "";
  });
  elements[0].focus();
}

function sortLeaderBoard() {
  leaderBoard.sort((a, b) => {
    return b.amount - a.amount;
  });
}

function deleteData(idToDelete) {
  leaderBoard = leaderBoard.filter((existingData) => {
    return existingData.id !== idToDelete;
  });

  // after delete again push the remaining data into localStorage...
  localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard));
  
  // sorting the leaderBoard
  sortLeaderBoard();

  // print values on the DOM
  printLeaderBoard();

  // reprint pie chart
  showGraph();
}

// ------------------------ CALCULATOR CODE --------------------------------------------


const incomeInput = document.querySelector("#incomeInput");
const calculateTax = document.querySelector("#calculateTax");
const totalIncome = document.querySelector("#totalIncome");
const tax = document.querySelector("#taxRate");
const ToPay = document.querySelector("#taxToPay");
const remainingIncome = document.querySelector("#afterTaxIncome");

calculateTax.addEventListener("click", () => {
  let income = parseFloat(incomeInput.value);
  let taxRate = getTaxRate(income);
  let taxToPay = (income * taxRate) / 100;
  let afterTaxIncome = income - taxToPay;

  // Update the UI with calculated values
  totalIncome.innerHTML = `Total Income: ₹${income.toFixed(2)}`;
  tax.innerHTML = `Tax Rate: ${taxRate}%`;
  ToPay.innerHTML = `Tax to Pay: ₹${taxToPay.toFixed(2)}`;
  remainingIncome.innerHTML = `Amount left after tax: ₹${afterTaxIncome.toFixed(2)}`;
});

// Function to determine tax rate based on income slabs
function getTaxRate(income) {
  if (income > 1000000) {
      return 20;
  } else if (income > 700000) {
      return 15;
  } else if (income > 500000) {
      return 10;
  } else if (income > 300000) {
      return 5;
  } else {
      return 0;
  }
}

function darkMode() {
  document.body.classList.toggle("dark-mode");
}


// ------------DELETE ALL NOTES---------------------------

const deleteAllData = document.querySelector("#deleteAll");

deleteAllData.addEventListener('click', ()=>{
  // deleting all data from localStorege
  leaderBoard = [];
  // pushing empty array to localStorage
  localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard));
  showGraph();
  printLeaderBoard();
})