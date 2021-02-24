import React from 'react'

function NoteForm ({ activeNote, note, onSubmit, onCancel, onUpdateNote, submitting, setSubmitting }) {
  function handleSubmit (event) {
    event.preventDefault()
  }

  const onEditField = (key, value) =>{
    onUpdateNote({
        ...activeNote,
        [key]: value,
    })
  }

  if(!activeNote) return <div className='no-active-note'>No note selected</div>
  return (
    <form onSubmit={handleSubmit} data-testid='note-form'>
      <div className='form-group'>
        <label>{activeNote.title}</label>
        <input
          className='form-control'
          data-testid='input-title'
          value={activeNote.title}
          onChange={(e) => onEditField('title',e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label>{activeNote.text}</label>
        <textarea
          className='form-control'
          data-testid='input-text'
          value={activeNote.text}
          onChange={(e) => onEditField('text',e.target.value)}
        />
      </div>
      <div className='form-group'>
        <input
          type='reset'
          data-testid='cancel-note'
          className='btn btn-default pull-right'
          value='Cancel'
          onClick={onCancel}
        />
        <input
            onSubmit={onSubmit}
          type='submit'
          data-testid='save-note'
          className='btn btn-default pull-right'
          value='Save'
        />
      </div>
    </form>
  )
}

NoteForm.defaultProps = {
  note: {
    id: '',
    title: '',
    text: ''
  }
}

export { NoteForm }
