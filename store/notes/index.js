export const state = () => ({
  notes: []
});

export const getters = {
  NOTES(state) {
    return state.notes;
  }
};

export const mutations = {
  SET_NOTES(state, payload) {
    state.notes = payload;
  },
  ADD_NOTE(state, payload) {
    state.notes = [
      ...state.notes,
      payload
    ];
  },
  UPDATE_NOTE(state, { _id, note }) {
    state.notes = [
      ...state.notes.filter(note => note._id !== _id),
      note
    ];
  },
  DELETE_NOTE(state, noteToDelete) {
    const noteId = state.notes.findIndex(note => note._id === noteToDelete._id);

    state.notes.splice(noteId, 1);
  }
};

export const actions = {
  getNotes({ commit }) {
    this.$axios.get('/note-list').then(res => {
      commit('SET_NOTES', res.data);
    });
  },
  changeTodoStatus({ getters, commit }, { editTodo, editNote }) {
    let newNote = getters.NOTES.find(note => note._id === editNote._id);

    newNote = JSON.parse(JSON.stringify(newNote));

    newNote.todoList = newNote.todoList.map(todo => {
        return todo.id === editTodo.id ?
          {
            ...todo,
            done: !todo.done
          }
          :
          todo;
      }
    );

    this.$axios.post('/update-note', {
      _id: newNote._id,
      noteHeading: newNote.noteHeading,
      noteText: newNote.noteText,
      todoList: newNote.todoList
    })
    .then(note => {
      commit('UPDATE_NOTE', {
        _id: note._id,
        note: note
      });
    });
  },
  changeTodo({ getters, commit }, { editTodoId, editTodoText, editNote }) {
    let newNote = getters.NOTES.find(note => note._id === editNote._id);

    newNote = JSON.parse(JSON.stringify(newNote));

    newNote.todoList = newNote.todoList.map(todo => {
        return todo.id === editTodoId ?
          {
            ...todo,
            text: editTodoText
          }
          :
          todo;
      }
    );

    this.$axios.post('/update-note', {
      _id: newNote._id,
      noteHeading: newNote.noteHeading,
      noteText: newNote.noteText,
      todoList: newNote.todoList
    })
    .then(note => {
      commit('UPDATE_NOTE', {
        _id: note._id,
        note: note
      });
    });
  },
  deleteTodo({ getters, commit }, { editNote, deleteTodo }) {
    let newNote = getters.NOTES.find(note => note._id === editNote._id);

    newNote = JSON.parse(JSON.stringify(newNote));

    const todoIdx = newNote.todoList.findIndex(
      todo => todo.id === deleteTodo.id);

    newNote.todoList.splice(todoIdx, 1);

    this.$axios.post('/update-note', {
      _id: newNote._id,
      noteHeading: newNote.noteHeading,
      noteText: newNote.noteText,
      todoList: newNote.todoList
    })
    .then(note => {
      commit('UPDATE_NOTE', {
        _id: note._id,
        note: note
      });
    });
  },
  addTodo({ getters, commit }, { editNote, todoText }) {
    let newNote = getters.NOTES.find(note => note._id === editNote._id);

    const newTodoId = newNote.todoList.length ? newNote.todoList[newNote.todoList.length - 1].id + 1 : 1;

    newNote = JSON.parse(JSON.stringify(newNote));

    newNote.todoList.push({
      id: newTodoId,
      text: todoText,
      done: false
    });

    this.$axios.post('/update-note', {
      _id: newNote._id,
      noteHeading: newNote.noteHeading,
      noteText: newNote.noteText,
      todoList: newNote.todoList
    })
    .then(note => {
      commit('UPDATE_NOTE', {
        _id: note._id,
        note: note
      });
    });
  },
  async addNewNote({ commit }, newNote) {
    await this.$axios.post('/note', {
      ...newNote
    })
    .then(note => {
      commit('ADD_NOTE', note);
    });
  },
  editExistNote({ getters, commit }, { _id, heading, text, todoList }) {
    let newNote = getters.NOTES.find(note => note._id === _id);

    newNote = JSON.parse(JSON.stringify(newNote));

    newNote = {
      ...newNote,
      noteHeading: heading || newNote.noteHeading,
      noteText: text || newNote.noteText,
      todoList: todoList || newNote.todoList
    };

    commit('UPDATE_NOTE', {
      _id: newNote._id,
      note: newNote
    });
  },
  updateExistNote({ commit }, newNote) {
    this.$axios.post('/update-note', {
      _id: newNote._id,
      noteHeading: newNote.noteHeading,
      noteText: newNote.noteText,
      todoList: newNote.todoList
    })
    .then(note => {
      commit('UPDATE_NOTE', {
        _id: note._id,
        note: note
      });
    });
  },
  async deleteExistNote({ commit }, note) {
    await this.$axios.post('/delete-note', {
      _id: note._id
    })
    // eslint-disable-next-line no-unused-vars
    .then(res => {
      commit('DELETE_NOTE', note);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
