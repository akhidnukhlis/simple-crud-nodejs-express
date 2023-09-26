import express from "express";
import {authMiddleware} from "../middleware/auth-middleware.js";
import userController from "../controllers/user-controller.js";
import bookController from "../controllers/book-controller";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get('/api/v1/users/current', userController.get);
userRouter.patch('/api/v1/users/current', userController.update);
userRouter.delete('/api/v1/users/logout', userController.logout);

// Book API
userRouter.post('/api/v1/books', bookController.create);

export {
    userRouter
}