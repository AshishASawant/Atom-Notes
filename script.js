let createbtn = document.getElementById("createbtn");
let title = document.getElementById("title");
let notetext = document.getElementById("notetext");
let usernotes = document.getElementById("usernotes");
let html;
let searchtitle=document.getElementById("searchtitle");
let notebox=document.getElementsByClassName('notecont');

//To load the notes after starting/refresing ths application
shownotes();

//Function to add a note
createbtn.addEventListener("click", function () {
  console.log("click event fired");

  // geting the user input text and nodecoontent
  let textobj = {
    title: title.value,
    notetext: notetext.value,
  };
  // geting the notes from localstorage
  let notes = localStorage.getItem("notes");

  //intitialising the notesobj
  let notesobj;
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  if (notetext.value.length != 0) {
    notesobj.push(textobj);
  }
  localStorage.setItem("notes", JSON.stringify(notesobj));
  shownotes()
});

// Funtion to display the notes
function shownotes() {
  let html=''
  let notes = localStorage.getItem("notes");
  let notesobj;
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  
  notesobj.forEach((element, index) => {
    html += ` <div class="card my-2 mx-3 notecont" style="width: 21rem;">
          <div class="card-body">
            <h5 class="card-title">${index + 1 + "." + element.title}</h5>
            <p class="card-text">${element.notetext}</p>
            <button id=${index} onclick="deletenote(this.id)" class="btn btn-primary">Delete note</button>          </div>
        </div>`;
        title.value = "";
        notetext.value = "";
      });
      usernotes.innerHTML = html;
}

// Function to delete the note
function deletenote(index) {
  console.log(`deleteing element at index ${index}`);
  let notes = localStorage.getItem("notes");
  let notesobj;
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let confirmdel=confirm("Do yo want to delete the note permanantely");
  if (confirmdel===true){

    notesobj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownotes();
  }
}

//Code to search the text based on input title
searchtitle.addEventListener('input',searchnote);
function searchnote() {
  let searchtext=searchtitle.value;
  console.log(searchtext);
  Array.from(notebox).forEach(element => {
    if(element.textContent.includes(searchtext)){
      element.style.display="block"; 
    }
    else{
      element.style.display="none"
    }
  });
} 