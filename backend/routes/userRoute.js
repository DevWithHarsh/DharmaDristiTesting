import express from 'express';
import authUser from '../middleware/auth.js';
import {
  loginUser, registerUser, adminLogin,
  getWishlist, addWishlist, removeWishlist
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

userRouter.use(authUser); // protect below
userRouter.post('/wishlist', getWishlist);
userRouter.post('/wishlist/add', addWishlist);
userRouter.post('/wishlist/remove', removeWishlist);

export default userRouter;
