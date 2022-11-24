import express from 'express'
import {
  getAllUsers,
  getUserById,
  getUserByIdAdmin,
  createUser,
  userLogin,
  updateUser,
  adminUserUpdate,
  deleteUser,
} from '../controllers/user_controller.js'

import { protect, authorize } from '../middleware/auth_middleware.js'

const router = express.Router()

router.get('/', protect, authorize, getAllUsers)

router.get('/getme', protect, getUserById)

router.get('/getuser/:userId', protect, authorize, getUserByIdAdmin)

router.post('/', createUser)

router.post('/login', userLogin)

router.put('/', protect, updateUser)

router.put('/admin/:userId', protect, authorize, adminUserUpdate)

router.delete('/:userId', protect, authorize, deleteUser)

export default router
