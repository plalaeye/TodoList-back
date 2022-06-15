import TaskInterface from './TaskInterface'

export default interface UserInterface {
  name: string
  theme: string
  task: TaskInterface[]
}
