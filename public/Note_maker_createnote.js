
const createbtn=document.getElementById("notebtn")
const text_note=document.getElementById('box')
const result=document.getElementById('notes')

const getallnotes=async()=>{
      const {data}=await axios.get("http://localhost:3000/api/v1/notes")


      for(let i=0;i<data.allnotes.length;i++){

        const h4=document.createElement('h4')
        h4.setAttribute("style","border:solid")
        h4.setAttribute("id",data.allnotes[i]._id)
        h4.setAttribute("name",data.allnotes[i])
        h4.textContent=data.allnotes[i].note
        result.appendChild(h4)

      }
}
const addsinglenote=async()=>{  
  try{
    const {data}=await axios.post("http://localhost:3000/api/v1/notes",{note:text_note.value})
    const h4=document.createElement('h4')
        h4.setAttribute("style","border:solid")
        h4.setAttribute("id",data._id)
        h4.textContent=data.note
        result.appendChild(h4)
    text_note.value=''
   alert("sucess,note added")}
   catch(err){
     alert("please try again")
   }
    
}

getallnotes()
createbtn.addEventListener('click',addsinglenote)


