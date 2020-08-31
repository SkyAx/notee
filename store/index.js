import Vue from 'vue';
import Vuex from 'vuex';
import notes from './notes';

Vue.use(Vuex);

new Vuex.Store({
  modules: {
    notes: notes
  }
});
