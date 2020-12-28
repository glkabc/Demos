import {rest} from 'msw';
import {res} from './utils';

import {handlers as canvasHandlers} from './features/canvas';

import {handlers as authHandlers} from './features/auth';
import {handlers as classesHandlers} from './features/classes';
import {handlers as courserequest} from './features/course'

const authURL = process.env.VUE_APP_AUTH_API;
const apiURL = process.env.VUE_APP_BASE_API;

export const handlers = [
  rest.post(`${authURL}/login`, (_, _1, ctx) => {
    console.log('msw handle login');
    localStorage.setItem('is-authenticated', true);
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          name: 'sean',
          age: 30,
          token: 'fakeToken',
        },
      })
    );
  }),
  rest.get(`${apiURL}/me`, (_, _1, ctx) => {
    const isAuthenticated = localStorage.getItem('is-authenticated');
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        name: 'sean',
        age: 30,
        token: 'fakeToken',
      })
    );
  }),
  rest.get(`${apiURL}/user`, (_, _1, ctx) => {
    const isAuthenticated = localStorage.getItem('is-authenticated');
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      })
    );
  }),
  rest.get(`${apiURL}/403`, (_, _1, ctx) => {
    console.log('%c cached 403 request', 'color: blue;');
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: 'Not authorized',
      })
    );
  }),
  ...authHandlers,
  ...canvasHandlers,
  ...classesHandlers,
  ...courserequest
];
