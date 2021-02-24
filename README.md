This task evaluates the candidate's skills in `React`.

# React Notes App Task

Notes application provides a simple list of notes.

## Setup

This app was created with [CRA v4.0.1](https://github.com/facebook/create-react-app).

Follow these steps for correct application setup :

1. `npm install` – install dependencies
2. `npm run test:watch` – watch all tests (should fail unless you fix the app)
3. `npm start` – serve the app at [http://localhost:3000/](http://localhost:3000/) (it automatically opens the app in your default browser)

---

## Your Task

Your task is to complete simple notes application using provided `NotesService` to retrieve and update notes:

- you should use function components.
- you shall stick to the names of the props, so that tests don't break.
- all tests have to pass.

## Requirements

- Notes application should provide a simple list of notes where each note contains `id`, `title` and `text` attributes.
- Notes application should let the user make a new note or to update an existing one.
- Info message should be visible by default.
- When a "New note" button is clicked, an empty form should be visible instead.
- When an existing note is selected, the user has options to:
  - save - which will update the selected note with new `title` and `text`
  - cancel - which will deselect the note

### 1. App and NotesService

- `NotesService` that's passed as `service` prop to the `App` component should be used
- When `App` is created, async `getNotes` method should be called on service and the appropriate component show notes as a list
- When an existing note is clicked, it should be highlighted on the list and its details should be displayed in the form.
- When an existing note is saved, it should be updated on the list
- When a form is submitted, async `saveNote` method should be called on service with the updated note object
- After a new note is save, it should be displayed on the list
- Click on the _New Note_ should call `createNote` method that puts an empty note object as a selected one

### 2. Note Form

- `NoteForm` should be a stateful component - it should manage title and text values, derived from prop _Note_.
- When the selected note is provided via `note` prop, title and text input fields should be populated
- When the form is submitted, it should call `onSubmit` with updated note object
- When _Cancel_ is clicked, the note should be unselected and note info should be shown

### 3. Use `NotesServices` to populate the list of notes

- Each item in the list should show a note title
- List component should notify its parent on item click with `onSelect` prop
- When note component gets passed a selected note's id via `selectedNoteId` prop, it should add `active` class to the correct list item

**Good Luck!**
