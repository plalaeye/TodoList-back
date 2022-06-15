import mongoose from 'mongoose'
import { TaskStatus } from '../enums/task-status'

const taskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	detail: {
		type: String,
	},
	dueDate: {
		type: Date,
	},
	category: {
		type: String,
	},
	tags: {
		type: [String],
	},
	status: {
		type: String,
		enum: Object.values(TaskStatus),
		required: true,
		default: TaskStatus.ONGOING,
	},
})

export default taskSchema;