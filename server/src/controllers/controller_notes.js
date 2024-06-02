import { Sequelize, Op } from 'sequelize'
import { Notes } from '../models/model_notes.js'
import { Users } from '../models/model_users.js'

export const getNotesByUserIsLoggin = async(req, res) => {
  const { userId } = req.params 
  
  const checkValidUserId = await Users.findOne({
    where: {
      id: userId
    }
  })
  
  if(!checkValidUserId) {
    return res.status(401).json([
      {
        status: 'failed',
        msg: 'user belum login, silahkan login dahulu!'
      }
    ])
  }
  
  const response = await Notes.findAll({
    attributes: ['id', 'title', 'status', 'createdAt', 'updatedAt'],
    where: {
      userId: userId
    }
  })
  
  res.status(200).json([
    {
      status: 'success',
      msg: `selamat datang ${checkValidUserId.username}`,
      data: response
    }
  ])
}

export const createNotes = async(req, res) => {
  const { userId, title, body } = req.body
  
  if(!title || title.trim().length < 1) {
    return res.status(400).json([
      {
        status: 'failed',
        msg: 'judul note tidak boleh kosong!'
      }
    ])
  }
  
  const saveNote = await Notes.create(req.body)
  const saveNoteSuccess = [saveNote]
  res.status(201).json([
    {
      status: 'success',
      msg: 'notes baru berhasil ditambahkan!',
      data: saveNoteSuccess.map(note => ({
        id: note.id,
        title: note.title
      }))
    }
  ])
}

export const notesDetail = async(req, res) => {
  const { id } = req.params
  
  const response = await Notes.findOne({
    where: {
      id: id
    }
  })
  
  if(!response) {
    return res.status(404).json([
      {
        status: 'failed',
        msg: `Notes dengan id ${id} tidak ditemukan!`
      }
    ])
  }
  
  res.status(200).json([
    {
      status: 'success',
      msg: 'Detail notes:',
      data: response
    }
  ])
  
}

export const updateNotesData = async(req, res) => {
  const { id } = req.params
  const { userId, title, body } = req.body
  
  if(!title || title.trim().length < 1) {
    return res.status(400).json([
      {
        status: 'failed',
        msg: 'judul note tidak boleh kosong!'
      }
    ])
  }
  
  const validNoteId = await Notes.findOne({
    where: {
      id: id
    }
  })
  
  if(!validNoteId) {
    return res.status(404).json([
      {
        status: 'failed',
        msg: `Notes dengan id ${id} tidak ditemukan!`
      }
    ])
  }
  
  const saveNoteUpdated = await Notes.update(req.body, {
    where:{
      id: id
    }
  })
  
  const noteUpdatedSuccess = [saveNoteUpdated]
  
  res.status(200).json([
    {
      status: 'success',
      msg: 'notes berhasil di edit!',
      data: noteUpdatedSuccess.map(note => ({
        id: id,
        title: note.title
      }))
    }
  ])
}

// untuk menandai kegiatan yg sudah dikerjakan
export const updateNotesStatus = async(req, res) => {
  const { id } = req.params
  
  const checkStatus = await Notes.findOne({
    attributes: ['id', 'status'],
    where: {
      id: id
    }
  })
  if(!checkStatus ) {
    return res.status(404).json([
      {
        status: 'failed',
        msg: `Notes dengan id ${id} tidak ditemukan!`
      }
    ])
  }
  
  let newStatusValue;
  if(checkStatus.status == 0) {
    newStatusValue = 1
  }
  if(checkStatus.status == 1) {
    newStatusValue = 0
  }
  const changeStatus = await Notes.update({
    status: newStatusValue
  }, {
    where: {
      id: id
    }
  })
  
  res.status(200).json([
    {
      status: 'success',
      msg: 'status berhasil diubah!',
      data: { status: newStatusValue}
    }
  ])
}

export const deleteNote = async(req, res) => {
  const { id } = req.params
  
  const validNoteId = await Notes.findOne({
    where: {
      id: id
    }
  })
  
  if(!validNoteId) {
    return res.status(404).json([
      {
        status: 'failed',
        msg: 'note gagal di hapus, id tidak ditemukan!'
      }
    ])
  }
  
  const response = await Notes.destroy({
    where: {
      id: id
    }
  })
  
  res.status(200).json([
    {
      status: 'success',
      msg: 'note berhasil dihapus!'
    }
  ])
}

export const getNotesTitleByQueryParam = async(req, res) => {
  const title  = req.query.title
  
  const response = await Notes.findAll({
    attributes: ['id', 'title', 'status', 'createdAt', 'updatedAt'],
    where: {
      title: {[Op.like]: `%${title}%`}
    }
  })
  if(response.length < 1) return res.status(404).json([
    {
      status: 'failed',
      msg: `Hasil pencarian ${title} tidak di temukan!`
    }
  ])
  
  res.status(200).json([
    {
      status: 'success',
      msg: `Hasil pencarian ${title}:`,
      data: response
    }
  ])
}