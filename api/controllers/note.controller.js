import Note from '../models/note.model';

async function getNotes(req, res) {
  let notes = await Note.find({});

  return res.status(200).json(notes);
}

// eslint-disable-next-line consistent-return
async function addNote(req, res) {
  const { error } = Note.validateCreateNote(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const noteRecord = new Note({
    noteHeading: req.body.noteHeading,
    noteText: req.body.noteText,
    todoList: req.body.todoList
  });

  await noteRecord
    .save()
    .then(note => {
      return res.status(201).json(note);
    })
    .catch(err => {
      return res.json(err)
      .status(500)
      .end();
    });
}

// eslint-disable-next-line consistent-return
async function updateNote(req, res) {
  const { error } = await Note.validateUpdateNote(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const note = Note.findOne({ '_id': req.body._id });

  if (!note) {
    return res.status(400).send('Note not found.');
  }

  Note.findOneAndUpdate({ _id: req.body._id }, {
    noteHeading: req.body.noteHeading,
    noteText: req.body.noteText,
    todoList: req.body.todoList
  }, { new: true })
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

// eslint-disable-next-line consistent-return
async function deleteNote(req, res) {
  const { error } = await Note.validateDeleteNote(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const note = Note.findOne({ '_id': req.body._id });

  if (!note) {
    return res.status(400).send('Note not found.');
  }

  await note.deleteOne()
    .then(() => {
      return res.status(200).end();
    })
    .catch((err) => {
      return res.json(err).status(500).end();
    });
}

export {
  getNotes,
  addNote,
  updateNote,
  deleteNote
};

