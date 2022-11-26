import Users from '../models/User.js'
import asyncHandler from 'express-async-handler'

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await Users.find({})
  res.status(200).json({ success: true, data: users })
})

// @desc Get user by id
// @route GET /api/users/getme
// @access Private
const getUserById = asyncHandler(async (req, res) => {
  const user = req.user
  res.status(200).json({ success: true, data: user })
})

// @desc Get user by id
// @route GET /api/users/getuser/:userId
// @access Private
const getUserByIdAdmin = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.userId)

  if (user) {
    res.status(200).json({ success: true, data: user })
  } else {
    throw (new Error('User not found'), res.status(404))
  }
})

// @desc Create user
// @route POST /api/users
// @access Public
const createUser = asyncHandler(async (req, res) => {
  const userExist = await Users.findOne({ email: req.body.email })

  if (userExist) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await Users.create(req.body)

  if (!user) {
    res.status(400)
    throw new Error('Unable to create user')
  }

  const token = user.getSignedJwtToken()

  res.status(201).json({ success: true, data: user, token })
})

// @desc Login user
// @route POST /api/users/login
// @access Private
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await Users.findOne({ email })

  if (!user) {
    res.status(401)
    throw new Error('Not Authorized')
  } else if (user && (await user.matchPassword(password))) {
    const token = user.getSignedJwtToken()

    res.status(200).json({ success: true, data: user, token })
  } else {
    res.status(401)
    throw new Error('Invalid Credentials')
  }
})

// @desc Update user
// @route PUT /api/users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const user = await Users.findOne({ email: req.user.email })

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  user.name = name
  user.email = email

  if (password) {
    user.password = password
  }

  await user.save()

  res.status(200).json({ success: true, data: user })
})

// @desc Update user
// @route PUT /api/users/admin/:userId
// @access Private/Admin
const adminUserUpdate = asyncHandler(async (req, res) => {
  const user = await Users.findOneAndUpdate(
    { _id: req.params.userId },
    req.body,
    {
      new: true,
    }
  )

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  res.status(200).json({ success: true, data: user })
})

// @desc Delete user
// @route DELETE /api/users/:userId
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await Users.findById({ _id: req.params.userId })

  if (user) {
    user.remove()
    res.status(200).json({ success: true, data: user, msg: 'User was deleted' })
  } else {
    throw (new Error('User not found'), res.status(404))
  }
})

export {
  getAllUsers,
  getUserById,
  getUserByIdAdmin,
  userLogin,
  createUser,
  updateUser,
  adminUserUpdate,
  deleteUser,
}
