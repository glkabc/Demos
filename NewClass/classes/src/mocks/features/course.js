import {rest} from 'msw'
import {res} from '../utils'

const apiURL = process.env.VUE_APP_BASE_API;
export const handlers = [
    rest.get(`${apiURL}/classMessage`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                code: 0,
                data: {
                    courseArr: [
                        {
                            id: 1,
                            imgSrc: '/png.png'
                        },
                        {
                            id: 2,
                            imgSrc: '/png.png'
                        },
                    ]
                },
                mesg: 'success',
            })
        );
    }),
];