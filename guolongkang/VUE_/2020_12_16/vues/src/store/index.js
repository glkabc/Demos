import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './actions'
import cart from './modules/cart'

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
    mutations,
    // getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
    // 也就类似 vue 中的 computed 中的方法。
    // Getter 也可以接受其他 getter 作为第二个参数：
    getters: {
        doenTodos: state => {
            console.log(111);
            console.log(state.todos.filter(todo => todo.doen));
            return state.todos.filter(todo => todo.doen);
        },
        doenTodosCount: (state, getters) => {
            console.log(state);
            return getters.doenTodos.length;
        },
        // 也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
        // 注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
        getTodosById: (state) => {
            return (id) => {
                return state.todos.find(todo => {
                    return todo.id === id;
                });
            }
        }
    },
    actions,
    modules: {
        cart
    }
})