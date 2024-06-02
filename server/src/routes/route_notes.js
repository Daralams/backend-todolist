import express from 'express'
import { 
  getNotesByUserIsLoggin,
  createNotes,
  notesDetail,
  updateNotesData,
  updateNotesStatus,
  deleteNote,
  getNotesTitleByQueryParam
  } from '../controllers/controller_notes.js'

const notesRoute = express.Router()
notesRoute.get('/my-notes/:userId', getNotesByUserIsLoggin)
notesRoute.post('/my-notes/new-note', createNotes)
notesRoute.get('/my-notes/detail/:id', notesDetail)
notesRoute.put('/my-notes/edit-note/:id', updateNotesData)
notesRoute.put('/my-notes/:id', updateNotesStatus)
notesRoute.delete('/my-notes/:id', deleteNote)
notesRoute.get('/search', getNotesTitleByQueryParam)

export default notesRoute