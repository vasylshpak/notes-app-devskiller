import uuid from 'uuid/dist/v4'

export class NotesService {
  constructor (data) {
    this.notes = data
  }

  /**
   * Gets up-to-date list of notes
   */
  async getNotes () {
    return this.notes
  }

  update (updateCb) {
    const clone = [...this.notes]
    updateCb(clone)
    this.notes = clone
  }

  /**
   * Create new note
   */
  async createNote () {
    return {
      id: uuid(),
      title: '',
      text: ''
    }
  }

  /**
   * Updates note if exists, adds new if not
   * @param note
   */
  async saveNote (note) {
    const index = this.notes.findIndex(({ id }) => note.id === id)
    const noteExists = index === -1

    if (noteExists) {
      this.update(notes => notes.push(note))
    } else {
      this.update(notes => notes.splice(index, 1, note))
    }
  }
}
