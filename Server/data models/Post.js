import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId : {
        type : String,
        required : true,
    },
    firstName : {
        type : String,
        required : true,
        min : 3,
        max : 30,
    },
    lastName : {
        type : String,
        required : true,
        min : 3,
        max : 30,
    },
    location : String,
    description : String,
    picturePath : {
        type : String,
        // default : "",
    },
    userPicturePath : {
        type : String,
        // default : "",
    },
    likes : { 
        type : Map, // contains IDs of users whos liked the post..
        of : Boolean,
    },
    comments : {
        type : Array,
        default : [],
    }
}, {timestamps : true}
);

export default mongoose.model('Post' , postSchema);