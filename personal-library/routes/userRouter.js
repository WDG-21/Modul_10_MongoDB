import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => res.json({ message: 'Get all users' }));
userRouter.get('/:id', (req, res) => res.json({ message: 'Get user by ID' }));
userRouter.post('/', (req, res) => res.json({ message: 'Create User' }));
userRouter.put('/:id', (req, res) => res.json({ message: 'Update User' }));
userRouter.delete('/:id', (req, res) => res.json({ message: 'Delete User' }));

export default userRouter;
