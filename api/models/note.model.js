import mongoose from 'mongoose';
const Joi = require('@hapi/joi');

require('dotenv').config();

let Schema = mongoose.Schema;

let NoteSchema = new Schema({
  noteHeading: {
    type: String,
    required: true
  },
  noteText: {
    type: String,
    required: false
  },
  todoList: {
    type: Array,
    required: false
  }
}, { collection: 'notes' });

NoteSchema.statics = {
  validateCreateNote: function (note) {
    const schema = Joi.object({
      noteHeading: Joi.string().required(),
      noteText: Joi.string().optional().allow(''),
      todoList: Joi.array()
    });

    return schema.validate(note);
  },
  validateUpdateNote: function (note) {
    const schema = Joi.object({
      _id: Joi.string().required(),
      noteHeading: Joi.string().required(),
      noteText: Joi.string().optional().allow(''),
      todoList: Joi.array()
    });

    return schema.validate(note);
  },
  validateDeleteNote: function(note) {
    const schema = Joi.object({
      _id: Joi.string().required()
    });

    return schema.validate(note);
  }
};

export default mongoose.model('Note', NoteSchema);
