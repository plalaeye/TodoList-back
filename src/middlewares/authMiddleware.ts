import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

function authMiddleware(req: Request, res: Response, next: NextFunction) {

  const token = req.cookies['todo-list-token']
  if (!token) {
    req._id = undefined
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, decoded: any) => {
      if (decoded) {
        req._id = decoded as string
      }
    })
  }
  
  next()
}

export default authMiddleware
