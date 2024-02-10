import Post from "../data models/Post.js";
import User from "../data models/User.js";

//CREATE POST
export const createPost = async (req,res) => {
    try {
        const { userId , description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId , 
            firstName : user.firstName, 
            lastName : user.lastName , 
            location : user.location ,
            description , 
            // picturePath : user.picturePath, // contains the posts of all users.. here updation is done to keep to have all posts..
            userPicturePath : user.picturePath, // contains the posts of that user .. Here updating is done when a user creates the posts..
            picturePath,
            likes : {} , 
            comments : []
        });
        await newPost.save();
        const post = await Post.find(); // returns all posts available in database to update the post feeds like in instagram..
        res.status(201).json(post); // post is taken to update the frontend..
    } catch (err) {
        res.status(409).json({message : err.message});
    }
};


// READ
export const getFeedPosts = async (req,res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({message : err.message});
    }
};

export const getUserPosts = async (req,res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({message : err.message});
    }
};

//UPDATE
export const likePost = async (req,res) => {
    try {
        const { id } = req.params; // id --- post ID 
        const { userId } = req.body; // userId ---  who liked
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }
        else {
            // post.likes.push(userId); // ???
            post.likes.set(userId , true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes : post.likes },
            { new : true }
        );

        res.status(200).json(updatedPost); // updatedPost is taken to update the frontend...
    } catch (err) {
        res.status(409).json({message : err.message});
    }
};
