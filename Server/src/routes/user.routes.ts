import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router: Router = Router();

//Unsecured routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/refresh-tokens').post(refreshAccessToken);

//Secured routes
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/me').get(verifyJWT, getCurrentUser);

export default router;
