import express from 'express'
import {
  getAllUsers,
  getUserById,
  createUser,
  userLogin,
  updateUser,
} from '../controllers/user_controller.js'

import { protect } from '../middleware/auth_middleware.js'

const router = express.Router()

router.get('/', protect, getAllUsers)

router.get('/getme', protect, getUserById)

router.post('/', createUser)

router.post('/login', userLogin)

router.put('/', protect, updateUser)

export default router
