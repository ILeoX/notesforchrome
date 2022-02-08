//Global variable declaration here
let addNew = document.getElementById("addNew");
let save = document.getElementById("save");

let edit = document.getElementById("edit");
let editBtn = document.getElementById("editBtn");
let cancelEditBtn = document.getElementById("cancelEditBtn");

let newNote = document.getElementById("newNote");
let noteList = document.getElementById("noteList");

let search = document.getElementById("search");

let noteItems = document.getElementById("noteItems");
let note_item = document.getElementsByClassName('note_item')

let notesArr = []

/** End of Variable Declaration */


window.onload = () => {  
      if (JSON.parse(window.localStorage.getItem('notes')) === null) {
            console.log('Empty Storage for key provided')
            noteItems.innerHTML = "<em>Add New Note...</em>"
     } else {
           notesArr = JSON.parse(window.localStorage.getItem('notes'));
           createDOMElement(notesArr);
      }
}

const deleteNote = e => {
      targetId = e.currentTarget.id

     if(prompt("Delete Note? Cancel for NO")){
           notesArr.splice ([targetId]) 
           createDOMElement(notesArr)
     }

     try {
      window.localStorage.setItem('notes', JSON.stringify(notesArr));
      }
      
      catch (err) {
            console.log(err)
      }
}

const editNote = e => {
      targetId = e.currentTarget.id

      let topic = notesArr[targetId].topic;
      let desc = notesArr[targetId].description;

      document.getElementById("editTopic").value = topic;
      document.getElementById("editDescription").value = desc;

      edit.classList.remove('hide')
      noteList.classList.add('hide')

      editBtn.addEventListener("click", () => { 
            let noteItem = {
                  topic: document.getElementById("editTopic").value,
                  description: document.getElementById("editDescription").value
            }
      
            if(noteItem.topic && noteItem.description !== "") {
                  notesArr[targetId] = noteItem
      
                  try {
                        window.localStorage.setItem('notes', JSON.stringify(notesArr));
                  }
                  catch (err) {
                        console.log(err)
                  }
            }
            edit.classList.add('hide')
            createDOMElement(notesArr)
            noteList.classList.remove('hide')
      })
}

cancelEditBtn.addEventListener("click", () => { 
      edit.classList.add('hide')
      noteList.classList.remove('hide')
      createDOMElement(notesArr)
})

const createDOMElement = arr => {
      noteItems.innerHTML = ""; //empty the DOM
      for(let i = 0; i < arr.length; i++){
            
            let liElem = document.createElement('li');
            liElem.setAttribute("class", "note_item");
      
            let hElem = document.createElement('h4');
            hElem.textContent = arr[i].topic;
            let spanElem = document.createElement('span');
            spanElem.textContent = arr[i].description;

            liElem.appendChild(hElem)
            liElem.appendChild(spanElem)
            noteItems.appendChild(liElem)
       }

       let num = 0;
       for(let i of note_item){
            i.addEventListener("dblclick", editNote);
            i.addEventListener("contextmenu", deleteNote);
            i.setAttribute("id", num)
            num++;
            
      } //One method for adding the double click event listener to all list items // you could add them one by one too.
      
}

search.addEventListener("keyup", (i) => {
      i = []
      notesArr.filter( (item) => {
            //check if the topic or description in a particular note (item) contains/includes the search value
            //convert to lowercase since includes method is case sensitive
            if(item.topic.toLowerCase().includes(search.value.toLowerCase()) || item.description.toLowerCase().includes(search.value.toLowerCase())) i.push(item);
      })

      if (i.length < 1){
            noteItems.innerHTML = "<em>No notes found...</em>"
      } else {
            createDOMElement(i)
      }
      
});

save.addEventListener("click", () => {
      newNote.classList.add('hide')
      noteList.classList.remove('hide')

      let topic = document.getElementById("topic").value;
      let description = document.getElementById("description").value;

      let noteItem = {
            topic: topic,
            description: description
      }

      if(noteItem.topic && noteItem.description !== "") {
            notesArr.push(noteItem)

            try {
                  window.localStorage.setItem('notes', JSON.stringify(notesArr));
            }
            catch (err) {
                  console.log(err)
            }
      }

      createDOMElement(notesArr);
      topic = document.getElementById("topic").value = "";
      description = document.getElementById("description").value = "";
})

addNew.addEventListener("click", () => {

      newNote.classList.remove('hide')
      noteList.classList.add('hide')

      try {
           JSON.parse(window.localStorage.getItem('notes'))
      }
      catch (err) {
            console.log(err)
      }
      
})
