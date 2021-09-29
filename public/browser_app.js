const notesDOM=document.querySelector(".notes-list")
const formDOM=document.querySelector(".notes-form")
const noteinputDOM =document.querySelector(".note-input")
const createbtnDOM=document.querySelector(".add-note-btn")
const formalertDOM=document.querySelector(".formalert")

//gets and shows all notes created by user
const showallnotes=async()=>{
    try{
    const {data:{allnotes}}=await axios.get("/api/v1/notes") //generating a get request
    
    if(allnotes.length<1){
       notesDOM.innerHTML='<h5>no notes </h5>'
       return
    }   


     const notes_list=allnotes.map((note_item)=>{
        const {note,completed,_id:notesID}=note_item;
        return `<br><div class="single-note ${completed && 'note-completed'}" >
        <h5><span><i class="far fa-check-circle"></i></span>${note}</h5>
        <div class="note-links">
    
        <!-- edit link -->
        <a href="edit_note.html?id=${notesID}"  class="edit-link">
        <i class="fas fa-edit"></i>
        </a>
        <!-- delete btn -->
        <button type="button" class="delete-btn" data-id="${notesID}">
        <i class="fas fa-trash"></i>
        </button>
        </div>
        </div>`

    }).join('')  //creating a string from array seperated with no space ,wherein each element of array is a <div>element
    
    notesDOM.innerHTML =notes_list //displaying given template string in browser
  }
    catch(err){
        notesDOM.innerHTML =
      `<h5 class="empty-list">There was an error, please try later....${err}</h5>`
    }

}

showallnotes()

notesDOM.addEventListener('click', async (e) => {
    const el = e.target
    if (el.parentElement.classList.contains('delete-btn')) {
      
      const id = el.parentElement.dataset.id //accesing id of the element which is to be deleted
      try {
        await axios.delete(`/api/v1/notes/${id}`)  //generating a delete request
        showallnotes()
      } catch (error) {
        console.log(error)
      }
    }
   
  })
  
  //posting a note 
  formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    const note = noteinputDOM.value  //accesing newly entered note content
  
    try {
      await axios.post('/api/v1/notes', { note }) //generating post request
      showallnotes()
      noteinputDOM.value = ''
      formalertDOM.style.display = 'block'
      formalertDOM.textContent = `success, note added`
      formalertDOM.classList.add('text-success')
    } catch (error) {
      formalertDOM.style.display = 'block'
      formalertDOM.innerHTML = `error, please try again${error}`
    }
    setTimeout(() => {
      formalertDOM.style.display = 'none'
      formalertDOM.classList.remove('text-success')
    }, 3000)
  })