import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './components/app'

import { NotesService } from './services/notes'
const notes = require('./test/notes.json')
const svc = new NotesService(notes)

ReactDOM.render(<App service={svc} />, document.getElementById('root'))
