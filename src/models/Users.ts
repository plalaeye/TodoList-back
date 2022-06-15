import mongoose from 'mongoose'
import { TaskStatus } from '../enums/task-status'
import { Theme } from '../enums/theme'
import taskSchema from './Task'

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
  },
  theme: {
    type: String,
    enum: Object.values(Theme),
    required: true,
    default: Theme.LIGHT,
  },
  category: {
    type: [String],
    required: true,
    default: [],
  },
  tasks: {
    type: [taskSchema],
    default: [],
  },
})

const usersModel = mongoose.model('Users', usersSchema)

export default usersModel
