import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config()
import morgan from 'morgan';
import helmet from 'helmet'

import connectDB from './config/connectDB.js';
import userRouter from './route/user.route.js';
import categoryRouter from './route/category.route.js';
const app = express();

// 
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];

app.use(cors({
// Allow requests from specific origins    
    origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
})); 

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginEmbedderPolicy: false
}))

const PORT = 8080 || process.env.PORT

app.get("/", (req,res)=> {
    // server to client 
    res.json({
        message: "Server is Running"
    })
})


app.use('/api/user', userRouter)
app.use("/api/category", categoryRouter);

connectDB().then(() =>{
    app.listen(PORT, () => {
        console.log("Server is Running ",PORT);
    })
})

