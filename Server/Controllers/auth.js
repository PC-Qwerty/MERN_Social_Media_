import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../data models/User.js';
// import { createError } from '../Utils/error.js';


// Register
export const register = async (req ,res ,next) => {
    try {
        const {
            firstName,
            lastName,
            user_name,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const  salt = await bcrypt.genSalt();
        const passHash = await bcrypt.hash(password , salt);

        // const newUser = new User({
        //     firstName : req.body.firstName,
        //     lastName : req.body.lastName,
        //     user_name : req.body.user_name,
        //     email : req.body.email,
        //     password : passHash,
        //     picturePath : req.body.picturePath,
        //     friends : req.body.friends,
        //     location : req.body.location,
        //     occupation : req.body.occupation
        // })

        const newUser = new User({
            firstName,
            lastName,
            user_name,
            email,
            password : passHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile : Math.round(Math.random() *100),
            impressions : Math.round(Math.random() *100),
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({error :err.message});
    }
};

//LOGIN
export const login = async (req, res , next) => {
    try {
        const {email , password } = req.body;
        const user = await User.findOne({email : email});
        if(!user) return res.status(404).json("User not found");

        const isValid = await bcrypt.compare(password , user.password);
        if(!isValid) return res.status(400).json("Invalid password");

        const token = jwt.sign({id : user.id} , process.env.JWT_secret); //to create a token
        delete user.password;
        res.status(200).json({token ,user});

        // THIS CAUSED MAIN ERROR IN PAYLOAD(COOKIE IN THE BELOW IS CAUSE OF THIS)
        // res
        // .cookie(
        //     "Access_Token" , token , {httpOnly : true}
        // ).status(200).json(user); // external(booking app)
    } catch (err) {
        res.status(err.status).json({error : err.message});
    }
};