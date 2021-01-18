import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
        todos: [
            {id: 1, text: 'LiMing', doen: true},
            {id: 2, text: 'Ming', doen: false},
            {id: 3, text: 'Liing', doen: true},
            {id: 4, text: 'Lig', doen: false}
        ]
    },
    mutations: {
        addCount(state) {
            state.count += 1;
            console.log('count add one!' + state.count);
        }
    },
    // getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
    getters: {
        doenTodos: state => {
            return state.todos.filter(todo => todo.doen);
        }
    },
    actions: {},
    modules: {}
})