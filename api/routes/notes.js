import express from 'express';

import { getNotes, addNote, updateNote, deleteNote } from '../controllers/note.controller';

const router = express.Router();

router.get('/note-list', getNotes);

router.post('/note', addNote);

router.post('/update-note', updateNote);

router.post('/delete-note', deleteNote);

export default router;

