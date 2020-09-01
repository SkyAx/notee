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
    this.$axios.get('/notes-list')
    .then(res => {
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
  deleteExistNote({ commit }, note) {
    debugger;

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
