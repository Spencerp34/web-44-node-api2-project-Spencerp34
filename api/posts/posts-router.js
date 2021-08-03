// implement your posts router here
 const Post = require('./posts-model');
 const express = require('express');
 const router = express.Router();

 router.get('/', async(req, res) => {
     try{
         const post = await Post.find();
         res.status(200).json(post)
     }catch(err){
        res.status(500).json({ message: "The posts information could not be retrieved" })
     }
 })

 router.get('/:id', async(req, res) => {
    try{
        const id = req.params.id
        const post = await Post.findById(id);
        if(!post){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }else{
            res.status(200).json(post)
        }
    }catch{
        res.status(500).json({ message: "The post information could not be retrieved" })
    }
 })

 router.post('/', async(req, res) => {
     try{
         const {title, contents} = req.body
         if( !title || !contents ){
            res.status(400).json({ message: "Please provide title and contents for the post" })
        }else{
            const {id} = await Post.insert(req.body)
            const newPost = await Post.findById(id)
             res.status(201).json(newPost)
        }
     }catch(err){
        res.status(500).json({ message: "There was an error while saving the post to the database" })
     }
 })

 router.put('/:id', async(req, res) => {
     try{
         const changes = req.body
         const {id} = req.params
         if(!changes.title || !changes.contents){
             res.status(400).json({ message: "Please provide title and contents for the post" })
         }else{
            const goodID = await Post.findById(id)

            if(!goodID){
                res.status(404).json({ message: "The post with the specified ID does not exist" })
            }else{
                const updated = await Post.update(id, changes)
                if(!updated){
                    res.status(500).json({message: "The post information could not be modified"})
                }else{
                    const updatedUser = await Post.findById(id)
                    res.status(200).json(updatedUser)
                }
            
            } 
         }

         
        
     }catch(err){
        res.status(500).json({ message: "The post information could not be modified" })
     }
 })

 router.delete('/:id', async(req, res) => {
     try{
        const id = req.params.id;
        const deleted = Post.remove(id)
        res.status(200).json(deleted)
     }catch(err){
        res.status(500).json({ message: "The post could not be removed" })
     }
 })

 module.exports = router