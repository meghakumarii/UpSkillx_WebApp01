const  noteIDDOM = document.querySelector('.note-edit-id')
const noteDOM = document.querySelector('.edit-note')
const noteCompletedDOM = document.querySelector('.note-edit-completed')
const editFormDOM = document.querySelector('.single-note-form')
const editBtnDOM = document.querySelector('.note-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search  //gets parameters in url
const id = new URLSearchParams(params).get('id')  //gets id of requested element from url
let tempName


const shownote = async () => {
  try {
    const {
      data: { single_note},
    } = await axios.get(`/api/v1/notes/${id}`)
    const { _id: noteID, completed, note } = single_note

    noteIDDOM.textContent = noteID
    noteDOM.value = note
    tempName = note
    if (completed) {
      noteCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}

shownote()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const newnote = noteDOM.value
    const noteCompleted = noteCompletedDOM.checked

    const {
      data: { upNote },
    } = await axios.patch(`/api/v1/notes/${id}`, {
      note:newnote,
      completed: noteCompleted,
    })

    const { _id: noteID, completed, note } = upNote

    noteIDDOM.textContent = noteID
    noteDOM.value = note
    tempName = note
    if (completed) {
      noteCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited note`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    noteDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})