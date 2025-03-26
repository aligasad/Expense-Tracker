const addNoteBtn = document.querySelector("#addNote");
const noteDiv = document.querySelector(".noteDiv");
const saveNote = document.querySelector("#saveBtn");
const closeNote = document.querySelector("#closeBtn");

const textarea = document.querySelector("#textarea");
const bgColor = document.querySelector("#background");
const txtColor = document.querySelector("#font") 

const notesContainer = document.querySelector("#notesContainer");

let uniqueId = 1;
let dataArr = localStorage.getItem('notesData') ? JSON.parse(localStorage.getItem('notesData')) : [];

window.addEventListener('load', ()=>{
  displayNotes(dataArr);
})
console.log("Color", dataArr);

addNoteBtn.addEventListener('click', ()=>{
  noteDiv.style.display = "block";
});

closeNote.addEventListener('click', ()=>{
  noteDiv.style.display = "none";
});

saveNote.addEventListener('click', ()=>{
  const obj = {
    id: uniqueId++,
    para: textarea.value,
    bgCol: bgColor.value,
    txtCol: txtColor.value
  }
  dataArr.push(obj);
  localStorage.setItem("notesData", JSON.stringify(dataArr));

  if (textarea.value.trim() === "") {
      alert("This field is required!");
      textarea.focus();
  } else {
      displayNotes();
      noteDiv.style.display = "none";
      textarea.value = "";
  }
  
})


function displayNotes() {
  notesContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  dataArr.forEach((obj)=>{
    const div = document.createElement('div');
    div.classList.add('div');
    div.style.backgroundColor = obj.bgCol;
    const close = document.createElement('p');
    close.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    close.classList.add('close');
  
    close.addEventListener('click', ()=> deleteData(obj.id));

    const para = document.createElement('p');
    para.innerText = obj.para;
    para.style.color = txtColor.value;
  
    div.append(close, para);
    fragment.append(div);
  })
  notesContainer.append(fragment);
}

function deleteData(idToDelete) {
  dataArr = dataArr.filter((existingData)=>{
    return existingData.id !== idToDelete;
  });
  
  
  localStorage.setItem("notesData", JSON.stringify(dataArr));
  
  // print values on the DOM
  displayNotes();
}
