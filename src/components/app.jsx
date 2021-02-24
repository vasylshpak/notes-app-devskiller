import React from "react";
import {useState, useEffect} from 'react'
//imported to generate random id for notes
import uuid from 'uuid/dist/v4'
import { NotesList } from "./notes-list";
import { NoteForm } from "./note-form";


const unselectedNote = {
  id: "",
  title: "",
  text: "",
};

function App({ service }) {
  const [notes, setNotes] = useState([]);
  const [ activeNote, setActiveNote] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Handle "New note" click
  function newNote() {
    const notesBody = {
      id: uuid(),
      title: 'untitled Note',
      text:''
    }
    console.log(notesBody)
    setNotes([notesBody, ...notes])
    console.log(notesBody)
  }

  // Handle selection of a task from the list
  function onSelect()  {
    return notes.find((note) => note.id === activeNote)
  }

  // Handle NoteForm submit and save the task
  function onSubmit(note) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
      }, 3000)
  }

  const onUpdateNote = (updatedNote) =>{
    const updatedNotesArray = notes.map((note) =>{
      if(note.id === activeNote){
        return updatedNote;
      }

      return note;
    })

    setNotes(updatedNotesArray)
  }

  // Handle cancel of note editing/creating
  function onCancel(idToCancel) {
    setNotes(notes.filter((note)=>note.id !== idToCancel))
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>React notes</h1>
        </div>
        <div className="col d-flex justify-content-end align-items-center">
          <button
            data-testid="new-note"
            onClick={()=>newNote()}
            className="btn btn-default"
          >
            New Note
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <NotesList
            notes={notes}
            newNote={newNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
            onSelect={onSelect}
            onCancel={onCancel}
            selectedNoteId={unselectedNote.id}
          />
        </div>
        <div className="col-md-8">
          <NoteForm
              activeNote={activeNote}
              onUpdateNote={ onUpdateNote}
            key={"xyz"} // You need to pass selected note id here, to correctly update NoteForm component
            note={unselectedNote}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
          <p className="lead" data-testid="note-info">
            Select a note to edit or create a new one
          </p>
        </div>
      </div>
    </div>
  );
}

export { App };
