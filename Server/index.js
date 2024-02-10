import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import postsRoute from './routes/posts.js';
import {register} from './Controllers/auth.js';
import {createPost} from './Controllers/posts.js';
import { verifyToken } from './Middleware/authorize.js';
import User from './data models/User.js';
import Post from './data models/Post.js';
import { posts, users } from './data/index(mock).js';

// configurations (middlewaares)

const __filename = fileURLToPath(import.meta.url); // to grab or use file url (depends on type :module)
const __dirname = path.dirname(__filename); //only when use of type:module
dotenv.config();

const app = express();
//what these should do?
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: '30mb' ,extended : true}));
app.use(bodyParser.urlencoded({limit :'30mb' , extended : true}));
app.use(cors(
    {
        origin:["https://mern-social-media-gold.vercel.app/"],
        // methods:["POST","GET"],
        // credentials:true
    }
));
app.use("/assets" , express.static(path.join(__dirname , 'public/assets'))); // set the directory to store assets locally (here aassets like images) in real life stores in actual file storage or cloud storage


// file storage configurations
const storage = multer.diskStorage( // -- what multer do? // saves files when someone uploads it saves in the below mentioned..
    {
        destination : function(req,file,cb){
            cb(null,"public/assets");
        },
        filename: function(req,file,cb){
            cb(null,file.originalname);
        }
    }
);
const upload = multer({storage}); //uploading is done using this variable

//mongodb connection configuration (mongoose)
const PORT = process.env.PORT || 3830;
mongoose.connect(process.env.MONGO , {
    useNewurlParser: true, //to parse the url provided
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT , ()=> console.log(`Connected to ${PORT}..`));

    // ADDING MOCK DATA TO DB(must be done only once)
    // User.insertMany(users);
    // Post.insertMany(posts);
    
}).catch((err) => console.error(`${err} connecting..`));

// if connecting issues persist during using the application
// mongoose.connection.on('connected' , () => {
//     console.log('Reconnected..');
// });
// mongoose.connection.on('disconnected' , () => {
//     console.log('Disconnected..');
// })


//routes with files
app.post('/api/auth/register', upload.single('picture') , register); // kept separate from routes folder because of upload(multer)..
app.post('/api/posts' , verifyToken, upload.single('picture') , createPost);
//routes
app.use('/api/auth' , authRoute);
app.use('/api/users' , usersRoute);
app.use('/api/posts', postsRoute);

// Just practice
// //custom error handler
// app.use((err,req,res,next) => {
//     const errStatus = err.status || 500;
//     const errMsg = err.message || "Error Occured";
//     return res.status(errStatus).json({
//         success : false,
//         status : errStatus,
//         message : errMsg,
//         stack : err.stack,
//     })
// });
