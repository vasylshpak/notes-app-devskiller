import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { NotesList } from '../components/notes-list'
const notes = require('./notes.json')

describe('NotesList Component', () => {
  it('should show list of notes', () => {
    // given
    const { getAllByTestId } = render(<NotesList notes={notes} />)

    // then
    expect(getAllByTestId('note-item')).toHaveLength(notes.length)
  })

  it('should call onSelect function after note was clicked', () => {
    // given
    const onSelect = jest.fn()
    const { getAllByTestId } = render(
      <NotesList notes={notes} onSelect={onSelect} />
    )

    // when
    const item = getAllByTestId('note-item')[1]
    userEvent.click(item)

    // then
    expect(onSelect).toHaveBeenCalledWith(notes[1])
  })

  it('should add `active` class to a note after it was selected', () => {
    // given
    const note = notes[1]
    const { getByText } = render(
      <NotesList notes={notes} selectedNoteId={note.id} />
    )

    // then
    const noteItem = getByText(note.title)
    expect(noteItem).toHaveClass('active')
  })
})
