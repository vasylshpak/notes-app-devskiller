import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { NoteForm } from '../components/note-form'
const notes = require('./notes.json')

describe('NoteForm Component', () => {
  it('should display title and note form input fields after note is selected', () => {
    // given
    const note = notes[1]
    const { getByTestId } = render(<NoteForm note={note} />)

    // then
    expect(getByTestId('input-title')).toHaveProperty('value', note.title)
    expect(getByTestId('input-text')).toHaveProperty('value', note.text)
  })

  it('should call onSubmit with changed note after the form is submitted', () => {
    // given
    const onSubmit = jest.fn()
    const note = { id: 'xyz', title: 'passed title', text: 'passed desc' }
    const { getByTestId } = render(<NoteForm note={note} onSubmit={onSubmit} />)

    // when
    const titleInput = getByTestId('input-title')
    const noteInput = getByTestId('input-text')
    userEvent.clear(titleInput)
    userEvent.type(titleInput, 'new title')
    userEvent.type(noteInput, ' and desc continuation')
    userEvent.click(getByTestId('save-note'))

    // then
    expect(onSubmit).toHaveBeenCalledWith({
      id: 'xyz',
      title: 'new title',
      text: 'passed desc and desc continuation'
    })
  })
})
