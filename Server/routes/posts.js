import express from "express";
import {getFeedPosts ,getUserPosts , likePost} from '../Controllers/posts.js';
import { verifyToken } from "../Middleware/authorize.js";

const router = express.Router();

//Read
router.get('/' , verifyToken , getFeedPosts); //gets all feed posts that in database like in instagram .. 
router.get('/:userId/posts' , verifyToken , getUserPosts); // gets only posts that the user posted..

//Update
router.patch('/:id/like' , verifyToken , likePost); // updates like (count) of a post for that user with ID : id refers to the postID..

export default router;