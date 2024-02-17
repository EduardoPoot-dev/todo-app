import { useState, useEffect } from 'react'
import crossIcon from '../assets/images/icon-cross.svg'

const Note = ({ note, notes, setNotes, allNotes, setAllNotes, actived, completed }) => {
    const [ isChecked, setIsChecked] = useState(false)
    const { description, id } = note

    //actualiza el cheked de acuerdo con la info extraida
    useEffect(() => {
        setIsChecked(note.checked)
    }, [])

    //elimina una nota 
    const handleDelete = () => {
        const deleteNote = notes.filter( note => note.id !== id )
        setAllNotes(deleteNote)
        setNotes(deleteNote)
    }

    //guarda el estado del check 
    const handleChange = () => {
        setIsChecked(!isChecked)

        if (isChecked) {
            note.checked = false
        } else {
            note.checked = true
        }

        const notesUpdate = allNotes.map( noteObj => noteObj.checked === note.checked && noteObj.id === note.id ? note :  noteObj)

        setAllNotes(notesUpdate)

        //actualiza las notas si estan en modo de notas activas o completas
        if(actived) {
            const notesActive = allNotes.filter( note => !note.checked )
            setNotes(notesActive)
        } 

        if(completed) {
            const notesCompleted = allNotes.filter( note => note.checked )
            setNotes(notesCompleted)
        }
    }

    return (
        <>
            <div className="note">
                <div className="check">
                    <input checked={isChecked} onChange={handleChange} type="checkbox" />
                </div>
                <span className='check-border'></span>
                <p>{ description }</p>
                <div className="delete" onClick={handleDelete}>
                    <img src={crossIcon} />
                </div>
            </div>
        </>
    )
}

export default Note