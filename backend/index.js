import express from 'express';
import { PORT,MONGODBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/bookRoutes.js'
import cors from 'cors'

const app = express();

//middleware for parsing requests body
app.use(express.json());

//middleware for handling CORS policy
app.use(cors());
// app.use(cors(
//     {
//         origin : 'http://localhost:5555',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     }
// ));

app.get('/' ,(request,response) => {
    console.log(request);
    return response.status(234).send('welcome to our mern stack project/..')
});

app.use('/books', booksRoute);

//connect to mongoose server
mongoose.connect(MONGODBURL)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    })
})
.catch((error) => {
    console.log(error);
})