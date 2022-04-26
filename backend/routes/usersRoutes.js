const express = require('express')

const router = express.Router()
// Get all the actions (testAPI) from the controller
const {
  getUser,
  getUsers,
  registerUser,
  loginUser,
  editUser,
  deleteUser,
  addItemToUser,
  deleteItemFromUser,
} = require('../controllers/usersController')

// Protect the needed routes
const { protect } = require('../middleware/authMiddleware')

// Define all the routes for /api/users
router.get('/', protect, getUsers)
router.get('/:id', getUser)
router.post('/', registerUser)
router.post('/login', loginUser)
router.put('/:id', protect, editUser)
router.delete('/:id', protect, deleteUser)
router.put('/:id/:location', protect, addItemToUser)
router.delete('/:id/:location', protect, deleteItemFromUser)

module.exports = router
