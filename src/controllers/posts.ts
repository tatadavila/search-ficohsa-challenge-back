import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";

interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

//all posts
const getAllposts = async (_req: Request, res: Response, _next: NextFunction) => {
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`,
    { headers: { "Accept-Encoding": "gzip,deflate,compress" } }) //axios issue :/
    let posts: [Post] = result.data

    return res.status(200).json({
        message: posts
    })
}

//single post
const getPost = async (req: Request, res: Response, _next: NextFunction) => {
    let id: string = req.params.id
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    let post: Post = result.data

    return res.status(200).json({
        message: post
    })
}

//udating post
const updatePost = async (req: Request, res: Response, _next: NextFunction) => {
    let id: string = req.params.id
    let title: string = req.params.title ?? null
    let body: string = req.params.body ?? null

    let response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body }),
    })

    return res.status(200).json({
        message: response.data
    })
}

//deleting post
const deletePost = async (req: Request, res: Response, _next: NextFunction) => {
    let id: string = req.params.id
    let result = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)

    return res.status(200).json({
        message: 'Post deleted successfully' || result
    })
}

//adding new post
const addPost = async (req:Request, res: Response, _next: NextFunction) => {
    let title: string = req.body.title
    let body: string = req.body.body

    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    })

    return res.status(200).json({
        message: response.data
    })
}

export default { getAllposts, getPost, updatePost, deletePost, addPost }