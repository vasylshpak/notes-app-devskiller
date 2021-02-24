import React from 'react'
function NotesList ({ notes, newNote, selectedNoteId, onSelect, activeNote, setActiveNote }) {
  return (
      <div>
        {notes.map((note)=>(
            <ul className='list-group'>
              <strong>{note.title}</strong>
            <li data-testid='note-item' className={`list-group-item ${note.id === activeNote && "active"}`}
                onClick={()=>setActiveNote(note.id)}>
              {note.text && note.text.substr(0, 10000)}
            </li>
              {/* 💡 it  was not necceraly to create new list as right down because add condition for styles */}
            </ul>
        ))}
      </div>
  )
}

NotesList.defaultProps = {
  notes: [],
  selectedNoteId: '',
  onSelect: () => {}
}

export { NotesList }
