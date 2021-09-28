

const createbtn=document.getElementById("notebtn")
const note=document.getElementById('box')
const result=document.getElementById('notes')
const postnote=async()=>{
   const {data}=await axios.post("http://localhost:3000/api/v1/notes",{note:note.value})
   console.log(data.note)
}

const addnote=()=>{
    let notes=note.value
    const h4=document.createElement('h4')
    h4.setAttribute("style","border:solid")
    h4.textContent=notes
    result.appendChild(h4)
    notes=''


}
createbtn.addEventListener('click',addnote)
createbtn.addEventListener('click',postnote)
