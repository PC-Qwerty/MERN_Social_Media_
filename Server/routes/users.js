import express from 'express';
import { getUser , getUserFriends , addRemoveFriend } from '../Controllers/users.js';
import { verifyToken } from '../Middleware/authorize.js';

const router = express.Router();

// Read
router.get('/:id' , getUser);
router.get('/:id/friends', getUserFriends);

//Update
router.patch('/:id/:friendId' , addRemoveFriend);

export default router;