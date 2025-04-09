import { Router } from 'express';

const bookRouter = Router();

bookRouter.get('/', (req, res) => res.json({ message: 'Get All Books' }));
bookRouter.get('/:id', (req, res) => res.json({ message: 'Get Book by ID' }));
bookRouter.post('/', (req, res) => res.json({ message: 'Create Book' }));
bookRouter.put('/:id', (req, res) => res.json({ message: 'Update book' }));
bookRouter.delete('/:id', (req, res) => res.json({ message: 'Delete Book' }));

export default bookRouter;
