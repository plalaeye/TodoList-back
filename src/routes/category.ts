import { Request, Response, Router } from 'express'
import usersModel from '../models/Users'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  const user = await usersModel.findById(req._id)
  if (!user) {
    return res.status(401).send({ msg: 'User not found' })
  }
  const { category } = req.body
  user.category.push(category)
  await user.save()
  return res.status(200).send(user)
})

export default router
