import { act } from 'react-dom/test-utils'
import _flushPromises from 'flush-promises'

import { NotesService } from '../services/notes'

export const flushPromises = async () => {
  await act(async () => {
    await _flushPromises()
  })
}

export function createMockService (notesData) {
  const svc = new NotesService(notesData)
  jest.spyOn(svc, 'getNotes')
  jest.spyOn(svc, 'createNote')
  jest.spyOn(svc, 'saveNote')
  return svc
}
