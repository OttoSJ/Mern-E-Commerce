import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/User.js'

export const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(`Bearer`)
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new Error('Not authorized'), res.status(401))
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).select('-password')

    next()
  } catch (error) {
    console.log(error)

    return next(new Error('Not authorized'), res.status(401))
  }
})

export const authorize = (req, res, next) => {
  if (req.user && !req.user.isAdmin) {
    return next(new Error('User is not authorized'), res.status(401))
  }

  return next()
}
