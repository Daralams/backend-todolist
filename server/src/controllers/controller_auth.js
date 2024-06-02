import { Sequelize } from 'sequelize'
import bcryptjs from 'bcryptjs'
import { Users } from '../models/model_users.js'

export const register = async(req, res) => {
  const { username, email, password, confirmPw } = req.body
  
  if(!username || username.trim().length < 1) {
    return res.status(400).json([
      {
        status: 'failed',
        msg: 'Username tidak boleh kosong!'
      }
    ])
  }
  
  if(!email || email.trim().length < 1) {
    return res.status(400).json([
      {
        status: 'failed',
        msg: 'Email tidak boleh kosong!'
      }
    ])
  }
  
  if(!password || password.trim().length < 8) {
    return res.status(400).json([
      {
        status: 'failed',
        msg: 'password tidak boleh kosong dan harus lebih dari 8 karakter!'
      }
    ])
  }
  
  if(password != confirmPw) {
    return res.status(400).json([
      {
        status: 'failed',
        msg: 'password dan konfirmasi password tidak sama!'
      }
    ])
  }
  
  const hashPw = await bcryptjs.hash(password, 10)
  const hashConfirmPw = await bcryptjs.hash(confirmPw, 10)
  
  const checkUniqueEmail = await Users.findOne({
    where: {
      email: email
    }
  })
  
  if(checkUniqueEmail) {
    return res.status(400).json([
      {
        status: 'failed',
        msg: 'Email sudah terdaftar, silahkan gunakan email lain!'
      }
    ])
  }
  
  const validUserData = {
    username,
    email,
    password: hashPw,
    confirmPw: hashConfirmPw
  }
  
  const saveUser = await Users.create(validUserData)
  const userSaved = [saveUser]
  res.status(201).json([
    {
      status: 'success',
      msg: 'register sukses!',
      data: userSaved.map(user => ({
        username: user.username,
        email: user.email
      }))
    }
  ])
}

export const login = async(req, res) => {
  const { email, password } = req.body
  
  const emailCheck = await Users.findOne({
    attributes: ['id', 'email', 'password'],
    where: { email: email }
  })
  
  if(!emailCheck) {
    return res.status(404).json([
      {
        status: 'failed',
        msg: 'login gagal, email tidak terdaftar!'
      }
    ])
  }
  
  const machPassword = await bcryptjs.compare(password, emailCheck.password)
    
    if(!machPassword) {
      return res.status(404).json([
        {
          status: 'failed',
          msg: 'login gagal, password tidak cocok!'
        }
      ])
    }
    
    res.status(200).json([
      {
        status: 'success',
        msg: `login berhasil`,
        data: emailCheck
      }
    ])
}