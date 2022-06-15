import TaskStatus from './../enums/TaskStatus'
import mongoose from 'mongoose'

export default interface TaskInterface {
  _id?: mongoose.Types.ObjectId
  title: string
  detail: string
  dueDate?: Date
  category?: string
  tags?: string[]
  status?: TaskStatus
}
