export const state = () => ({
  notes: [
    {
      id: 1,
      noteHeading: 'First Note',
      noteText: 'С другой стороны укрепление и развитие структуры в значительной степени обуславливает создание позиций,' +
        ' занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт начало повседневной работы по ' +
        'формированию позиции требуют от нас анализа дальнейших направлений развития. Идейные соображения высшего порядка, ' +
        'а также новая модель организационной деятельности влечет за собой процесс внедрения и модернизации соответствующий условий активизации. ' +
        'Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс ' +
        'внедрения и модернизации направлений прогрессивного развития.',
      todoList: []
    },
    {
      id: 2,
      noteHeading: 'Second Note',
      noteText: 'С другой стороны укрепление и развитие структуры в значительной степени обуславливает создание позиций,' +
        ' занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт начало повседневной работы по ' +
        'формированию позиции требуют от нас анализа дальнейших направлений развития. Идейные соображения высшего порядка, ' +
        'а также новая модель организационной деятельности влечет за собой процесс внедрения и модернизации соответствующий условий активизации. ' +
        'Повседневная практика показывает, что новая модель организационной деятельности влечет за собой процесс ' +
        'внедрения и модернизации направлений прогрессивного развития.',
      todoList: [
        {
          id: 1,
          done: false,
          text: 'text1'
        },
        {
          id: 2,
          done: false,
          text: 'text2'
        },
        {
          id: 3,
          done: false,
          text: 'text3'
        },
        {
          id: 4,
          done: false,
          text: 'text4'
        },
        {
          id: 5,
          done: false,
          text: 'text5'
        },
        {
          id: 6,
          done: false,
          text: 'text6'
        },
        {
          id: 7,
          done: false,
          text: 'text7'
        }
      ]
    }
  ]
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
    const nextId = state.notes.length ? state.notes.length + 1 : 1;

    state.notes = [
      ...state.notes,
      {
        nextId,
        ...payload
      }
    ];
  },
  UPDATE_NOTE(state, { id, note }) {
    state.notes = [
      ...state.notes.filter(note => note.id !== id),
      note
    ];
  },
  DELETE_NOTE(state, noteToDelete) {
    const noteId = state.notes.findIndex(note => note.id === noteToDelete.id);

    state.notes.splice(noteId, 1);
  }
};

export const actions = {
  getNotes({ commit }) {
    this.$axios.get('/notes-list').then(res => {
      commit('SET_NOTES', res.data);
    });
  },
  changeTodoStatus({ getters, commit }, { editTodo, editNote }) {
    let newNote = getters.NOTES.find(note => note.id === editNote.id);

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

    commit('UPDATE_NOTE', {
      id: editNote.id,
      note: newNote
    });
  },
  changeTodo({ getters, commit }, { editTodoId, editTodoText, editNote }) {
    let newNote = getters.NOTES.find(note => note.id === editNote.id);

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

    commit('UPDATE_NOTE', {
      id: editNote.id,
      note: newNote
    });
  },
  deleteTodo({ getters, commit }, { editNote, deleteTodo }) {
    let newNote = getters.NOTES.find(note => note.id === editNote.id);

    newNote = JSON.parse(JSON.stringify(newNote));

    const todoIdx = newNote.todoList.findIndex(
      todo => todo.id === deleteTodo.id);

    newNote.todoList.splice(todoIdx, 1);

    commit('UPDATE_NOTE', {
      id: editNote.id,
      note: newNote
    });
  },
  addTodo({ getters, commit }, { editNote, todoText }) {
    let newNote = getters.NOTES.find(note => note.id === editNote.id);

    const newTodoId = newNote.todoList.length ? newNote.todoList[newNote.todoList.length - 1].id + 1 : 1;

    newNote = JSON.parse(JSON.stringify(newNote));

    newNote.todoList.push({
      id: newTodoId,
      text: todoText,
      done: false
    });

    commit('UPDATE_NOTE', {
      id: editNote.id,
      note: newNote
    });
  },
  addNewNote({ commit }, note) {
    commit('ADD_NOTE', note);
  },
  editExistNote({ getters, commit }, { id, heading, text, todoList }) {
    let newNote = getters.NOTES.find(note => note.id === id);

    newNote = JSON.parse(JSON.stringify(newNote));

    newNote = {
      ...newNote,
      noteHeading: heading || newNote.noteHeading,
      noteText: text || newNote.noteText,
      todoList: todoList || newNote.todoList
    };

    commit('UPDATE_NOTE', {
      id: newNote.id,
      note: newNote
    });
  },
  updateExistNote({ commit }, note) {
    commit('UPDATE_NOTE', {
      id: note.id,
      note: note
    });
  },
  deleteExistNote({ commit }, note) {
    commit('DELETE_NOTE', note);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
