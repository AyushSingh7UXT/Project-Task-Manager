import express from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  blockUser,
  resetUserPassword
} from '../controllers/userController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, authorize('admin'));
router.route('/').get(getUsers).post(createUser);
router.route('/:id').put(updateUser).delete(deleteUser);
router.patch('/block/:id', blockUser);
router.patch('/reset-password/:id', resetUserPassword);

export default router;
