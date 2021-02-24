import React from 'react'
import { render, act, getByText } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { createMockService, flushPromises } from './utils'
import { App } from '../components/app'

describe('App Component', () => {
  const notes = [
    {
      id: '4567',
      title: 'update the exam excercise',
      text: 'netguru makes it better'
    },
    {
      id: 'xyz',
      title: 'look at frontend architecture',
      text: 'from the new perspective'
    }
  ]

  it('should show the notes info and hides the form by default', async () => {
    // given
    const mockService = createMockService(notes)
    const { queryByTestId } = render(<App service={mockService} />)
    await flushPromises() // HTTP data exchange

    // then
    expect(queryByTestId('note-info')).toBeInTheDocument()
    expect(queryByTestId('note-form')).toBeNull()
  })

  it('should fetch notes from notesService when rendered', async () => {
    // given
    const mockService = createMockService(notes)
    const originalLength = mockService.notes.length
    const { getAllByTestId } = render(<App service={mockService} />)
    await flushPromises() // HTTP data exchange

    // then
    expect(mockService.getNotes).toHaveBeenCalled()
    expect(getAllByTestId('note-item')).toHaveLength(originalLength)
  })

  it('should show note form with empty note after new note is clicked', async () => {
    // given
    const mockService = createMockService(notes)
    const { getByTestId } = render(<App service={mockService} />)
    await flushPromises() // HTTP data exchange

    // when
    await act(async () => {
      await userEvent.click(getByTestId('new-note'))
    })

    // then
    expect(mockService.createNote).toHaveBeenCalledTimes(1)
    getByTestId('note-form')
  })

  it('should add a new note to the list after the form is submitted', async () => {
    // given
    const mockService = createMockService(notes)
    const { getAllByTestId, getByTestId } = render(
      <App service={mockService} />
    )
    await flushPromises() // HTTP data exchange

    await act(async () => {
      await userEvent.click(getByTestId('new-note'))
      userEvent.type(getByTestId('input-title'), 'buy milk')
      userEvent.type(getByTestId('input-text'), 'need some fresh milk')
      userEvent.click(getByTestId('save-note'))
    })

    // then
    expect(mockService.saveNote.mock.calls[0][0]).toMatchObject({
      title: 'buy milk',
      text: 'need some fresh milk'
    })
    expect(mockService.saveNote).toHaveBeenCalledTimes(1)
    expect(mockService.getNotes).toHaveBeenCalledTimes(2)
    expect(getAllByTestId('note-item')).toHaveLength(mockService.notes.length)
  })

  it('when existing note is clicked it should be highlighted on the list and form should be visible with its deatils', async () => {
    // given
    const mockService = createMockService(notes)
    const note = notes[0]
    const { getByText, getByTestId } = render(<App service={mockService} />)
    await flushPromises() // HTTP data exchange
    const noteItem = getByText(note.title)

    // when
    userEvent.click(noteItem)

    // then
    expect(noteItem).toHaveClass('active')
    expect(getByTestId('input-title')).toHaveValue(note.title)
    expect(getByTestId('input-text')).toHaveValue(note.text)
  })

  it('when existing note is saved it should be updated on list', async () => {
    // given
    const mockService = createMockService(notes)
    const { getAllByTestId, getByTestId } = render(
      <App service={mockService} />
    )
    await flushPromises() // HTTP data exchange

    // when changing note title
    userEvent.click(getAllByTestId('note-item')[0])
    userEvent.type(getByTestId('input-title'), 'changed task')
    userEvent.click(getByTestId('save-note'))
    await flushPromises() // HTTP data exchange

    expect(mockService.saveNote).toHaveBeenCalledTimes(1)
    expect(mockService.getNotes).toHaveBeenCalledTimes(2)

    // then
    const item = getAllByTestId('note-item')[0]
    expect(item).toHaveTextContent('changed task')
  })

  it('when editing existing note is canceled it should deselect note and hide the form', async () => {
    // given
    const mockService = createMockService(notes)
    const { getAllByTestId, getByTestId, container } = render(
      <App service={mockService} />
    )
    await flushPromises() // HTTP data exchange

    // then
    expect(mockService.getNotes).toHaveBeenCalledTimes(1)

    // when changing note title
    userEvent.click(getAllByTestId('note-item')[0])
    userEvent.type(getByTestId('input-title'), 'changed task')
    userEvent.click(getByTestId('cancel-note'))
    await flushPromises() // HTTP data exchange

    // then
    expect(container.querySelector('[data-testid=note-item].active')).toBeNull()
    const item = getAllByTestId('note-item')[0]
    expect(item).toHaveTextContent(notes[0].title)
    expect(container.querySelector('[data-testid=note-item].active')).toBeNull()
  })
})
