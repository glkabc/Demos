import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../components/componentsPage/home';
import Mine from '../components/componentsPage/mine';
const NotFound = () => import('../components/componentsPage/notFound');
const Children1 = () => import('../components/componentsPage/childrenPage/children1')
const Children2 = () => import('../components/componentsPage/childrenPage/children2');

let routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home/:time/:hour',
        // path: '/home',
        component: Home,
        children: [
            {
                path: '',
                redirect: 'children1'
            },
            {
                path: 'children1',
                name: 'children1',  // 子路由必须要先设置 才可以 使用函数式编程
                component: Children1
            },
            {
                path: 'children2',
                component: Children2
            },
            {
                path: '*',
                component: NotFound
            }
        ]
    },
    {
        path: '/mine/:name',
        component: Mine
    },
    {
        path: '*',
        component: NotFound
    }
];

export default new VueRouter({
    routes,
    mode: 'history'
});