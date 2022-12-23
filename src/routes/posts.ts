import express from 'express'
import controller from '../controllers/posts'
const router = express.Router()

router.get('/items', controller.getAllposts)
router.get('/items/:id', controller.getPost)
router.put('/items/:id', controller.updatePost)
router.delete('/items/:id', controller.deletePost)
router.post('/items', controller.addPost)

export = router
