import express from 'express';
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from '../controllers/notes.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.get('/', auth, getNotes);
router.post('/', auth, createNote);

router.get('/:id', getNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
