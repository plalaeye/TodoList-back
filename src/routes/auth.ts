// import { userDto } from 'interfaces/user'
import { Request, Response, Router } from 'express'
import usersModel from '../models/Users'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

function generateToken(username: string): string {
  return jwt.sign(username, process.env.TOKEN_SECRET as string)
}

router.get('/me', async (req: Request, res: Response) => {
  if (req._id) {
    const user = await usersModel.findById(req._id)
    return res.status(200).send({ user })
  } else {
    return res.status(200).send({ user: null })
  }
})

router.post('/register', async (req: Request, res: Response) => {
  const { name, theme } = req.body
  const existUser = await usersModel.findOne({ name })
  if (existUser) {
    return res.status(401).send({ msg: 'This name is already exists' })
  }
  const user = new usersModel({ name, theme })
  try {
    await user.save()
  } catch (e) {
    res.status(400).send(e)
  }
  const token = generateToken(user._id.toString())
  res.cookie('todo-list-token', token)
  res.status(201).send(user)
})

router.post('/login', async (req: Request, res: Response) => {
  const { name } = req.body
  const user = await usersModel.findOne({ name })
  if (!user) {
    return res.status(401).send({ msg: 'User not found' })
  }
  const token = generateToken(user._id.toString())
  res.cookie('todo-list-token', token)
  res.status(200).send(user)
})

router.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('todo-list-token')
  res.status(200).send({ msg: 'Logout successful' })
})

export default router
