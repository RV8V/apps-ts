import { Request, Response, NextFunction } from 'express'

export const notFoundError = (req: Request, res: Response, next: NextFunction) => {
  const err: Error = new Error('not found')
  next({ ...err, status: 404 })
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const { message, status, stack } = err
  return res.status(status || 500).json({ message, status, stack })
}
