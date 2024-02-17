import { useState, useEffect } from 'react';
import Note from './components/Note';
import { generateId } from './helpers/index'

function App() {
  const [theme, setTheme] = useState('')
  const [note, setNote] = useState('')
  const [allNotes, setAllNotes] = useState([])
  const [notes, setNotes] = useState([])
  const [actived, setActived] = useState(false)
  const [completed, setCompleted] = useState(false)

  //guarda el color de tema en storage
  useEffect(() => {
    if (theme !== '') {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  //carga el tema por defecto
  useEffect(() => {
    const storageTheme = localStorage.getItem('theme')
    const systemColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const newTheme = storageTheme ?? systemColorScheme;

    setTheme(newTheme)
  }, [])

  //cambia el color del tema
  const handleChangeTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  //crea una nueva nota
  const handleNewNote = () => {
    if (note === '') return

    const noteObject = {
      description: note,
      id: generateId(),
      checked: false
    }

    setAllNotes([...allNotes, noteObject])
    setNotes([...notes, noteObject])

    setNote('')
  }

  //muestra todas las notas
  const handleAllNotes = () => {
    setNotes(allNotes)

    setActived(false)
    setCompleted(false)
  }

  //muestra las notas activas
  const handleNotesActive = () => {
    const notesActive = allNotes.filter( note => !note.checked )
    setNotes(notesActive)

    setActived(true)
    setCompleted(false)
    
  }

  //muestra las notas completas
  const handleNotesComplete = () => {
    const notesCompleted = allNotes.filter( note => note.checked )
    setNotes(notesCompleted)

    setActived(false)
    setCompleted(true)
  }

  //elimina las notas completas
  const handleClearComplete = () => {
    const deleteNotes = allNotes.filter( note => !note.checked )

    setNotes(deleteNotes)
    setAllNotes(deleteNotes)

    setActived(false)
    setCompleted(false)
  }

  return (
    <div className="layout" data-theme={theme}>
      <main className="main">
        <header>
          <h1>Todo</h1>
          <div className="toggle" onClick={handleChangeTheme}></div>
        </header>

        <form>
          <input id="new-note" value={note} onChange={e => setNote(e.target.value)} onBlur={handleNewNote} type="text" placeholder="Create a new Todo..." />
          <label htmlFor="new-note"></label>
        </form>

        <section>

          {notes.map((note) => {
            return (
              <Note
                note={note}
                notes={notes}
                setNotes={setNotes}
                allNotes={allNotes}
                setAllNotes={setAllNotes}
                actived={actived}
                completed={completed}

                key={note.id}
            />
           )})
          }

          <footer className="notes-footer">
            <div className="left">
              <p>{notes.length} items left</p>
            </div>

            <div className="middle">
              <button className={ !actived && !completed ? 'active' : '' } onClick={handleAllNotes}>All</button>
              <button className={ actived ? 'active' : '' } onClick={handleNotesActive}>Active</button>
              <button className={ completed ? 'active' : '' } onClick={handleNotesComplete}>Completed</button>
            </div>

            <div className="right">
              <button onClick={handleClearComplete}>Clear completed</button>
            </div>
          </footer>
        </section>


      </main>
    </div>

  )
}

export default App