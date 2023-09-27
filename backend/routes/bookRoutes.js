import express ,{ request, response }from "express";
import {Book} from '../models/bookModel.js'

const router = express.Router();
//store new book
router.post('/',async(request,response) => {
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(404).send('Send all required fields ..');
        }  
        const newBook = {
            title : request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        } ;
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }catch(err){
        console.log(err.message);
        response.status(500).send({message: err.message});
    }
})

//get all books
router.get('/',async(request,response) => {
    try {
        const books = await Book.find({});
        return response.status(201).json({
            count : books.length,
            data : books
        })
    } catch (error) {
        console.log(error);
        response.status(500).send({message: err.message});
    }
})


//get by id
router.get('/:id',async(request,response) => {
    try {
        const {id}  = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error);
        response.status(500).send({message: err.message});
    }
})

//get by id and update book
router.put('/:id',async(request,response) => {
    try {
        const {id}  = request.params;

        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(404).send('Send all required fields ..');
        }  

        const result = await Book.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).send({message:'book not found'});
        }
        return response.status(200).json({message: "book updated successfully"});
    } catch (error) {
        console.log(error);
        response.status(500).send({message: err.message});
    }
})


//get by id and delete book
router.delete('/:id',async(request,response) => {
    try {
        const {id}  = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).send({message:'book not found'});
        }
        return response.status(200).json({message: "book delete successfully"});
    } catch (error) {
        console.log(error);
        response.status(500).send({message: err.message});
    }
})


export default router;