import { Request, Response, Router } from 'express'
import TaskInterface from '../interfaces/TaskInterface'
import usersModel from '../models/Users'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  const user = await usersModel.findById(req._id)
  if (!user) {
    return res.status(401).send({ msg: 'User not found' })
  }
  const { title, detail, dueDate, category, tags } = req.body
  const task: TaskInterface = { title, detail, dueDate, category, tags }
  user.tasks.push(task)
  await user.save()
  res.status(201).send(user)
})

router.put('/:id', async (req: Request, res: Response) => {
  const user = await usersModel.findById(req._id)
  if (!user) {
    return res.status(401).send({ msg: 'User not found' })
  }
  const taskId = req.params['id']

  const task: TaskInterface = req.body

  user.tasks.id(taskId).set(task)

  await user.save()
  res.status(200).send(user)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const user = await usersModel.findById(req._id)
  if (!user) {
    return res.status(401).send({ msg: 'User not found' })
  }
  const taskId = req.params['id']
  user.tasks = user.tasks.filter(
    (task: TaskInterface) => task._id && task._id.toString() !== taskId
  )
  await user.save()
  res.status(200).send(user)
})

router.put('/status/:id', async (req: Request, res: Response) => {
  const user = await usersModel.findById(req._id)
  if (!user) {
    return res.status(401).send({ msg: 'User not found' })
  }
  const { id } = req.params
  const { status } = req.body
  user.tasks = user.tasks.map((task: TaskInterface) => {
    if (task._id && id === task._id.toString()) {
      task.status = status
    }
    return task
  })

  await user.save()
  res.status(201).send(user)
})

export default router
