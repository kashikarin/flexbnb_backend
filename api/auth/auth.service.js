import bcrypt from 'bcrypt'
import Cryptr from 'cryptr'
import { userService } from '../user/user.service.js'

import { dbService } from '../../services/db.service.js'

const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

export const authService = {
  ping,
  signup,
  login,
  getLoginToken,
  validateToken,
}

function ping() {
  return { ok: true, from: 'auth.service' }
}
function getLoginToken(user) {
  const str = JSON.stringify(user)
  return cryptr.encrypt(str)
}
function validateToken(token) {
  try {
    const json = cryptr.decrypt(token)
    return JSON.parse(json)
  } catch (err) {
    console.log('Invalid login token')
    return null
  }
}

export async function signup({
  email,
  username,
  password,
  fullname,
  imgUrl,
  isHost,
}) {
  const collection = await dbService.getCollection('users')

  if (!password || !fullname) {
    throw new Error('Password and full name are required')
  }

  if (!email && !username) {
    throw new Error('Email or username is required')
  }

  const existingUser = await collection.findOne({
    $or: [email ? { email } : null, username ? { username } : null].filter(
      Boolean
    ),
  })

  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error('Email already exists')
    }
    if (existingUser.username === username) {
      throw new Error('Username already exists')
    }
    throw new Error('User already exists')
  }

  const saltRounds = 10
  const hash = await bcrypt.hash(password, saltRounds)

  const doc = {
    email: email || null,
    username: username || null,
    password: hash,
    fullname,
    imgUrl:
      imgUrl ||
      'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
    isHost: !!isHost,
    isAdmin: false,
    likedHomes: [],
    createdAt: Date.now(),
  }

  const { insertedId } = await collection.insertOne(doc)

  return {
    _id: insertedId,
    email: doc.email,
    username: doc.username,
    fullname: doc.fullname,
    imgUrl: doc.imgUrl,
    isHost: doc.isHost,
    isAdmin: doc.isAdmin,
    likedHomes: doc.likedHomes,
    createdAt: doc.createdAt,
  }
}

async function login({ email, username, password }) {
  const collection = await dbService.getCollection('users')

  const user = await collection.findOne({
    $or: [{ email }, { username }],
  })

  if (!user) {
    throw new Error('Username not found')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw new Error('Incorrect password')
  }

  return {
    _id: user._id,
    email: user.email,
    username: user.username,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    isHost: user.isHost,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
  }
}
