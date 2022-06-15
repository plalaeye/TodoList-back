import { Request, Response, Router } from 'express'
import usersModel from '../models/Users'

const router = Router()

router.put('/', async (req: Request, res: Response) => {
  const _id = req._id
  const { theme } = req.body
  const user = await usersModel.findByIdAndUpdate(_id, { theme })
  if (!user) {
    return res.status(401).send({ msg: 'User not found' })
  }
  const updatedUser = await usersModel.findById(_id)
  res.status(200).send(updatedUser)
})

export default router
