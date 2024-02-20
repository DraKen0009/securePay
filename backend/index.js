import 'dotenv/config';
import express from "express";
import userRouter from './routes/users.js'
import accountRouter from './routes/accounts.js'
import connectDB from "./db/connectDB.js";
import cors from 'cors';


const app = express()
const port = process.env.PORT || 8000
const DATABASE_URL = process.env.DATABASE_URL

app.use(cors())

connectDB(DATABASE_URL)
    .then(() => {
        console.log("connected to Database")
    })

app.use(express.json())
app.use('/api/v1/user', userRouter)
app.use('/api/v1/account', accountRouter)

app.listen(port, () => {
    console.log(`Listening to server at : http://localhost:${port}`)
})




