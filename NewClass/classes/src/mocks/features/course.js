import {rest} from 'msw'
import {res} from '../utils'

const apiURL = process.env.VUE_APP_BASE_API;
export const handlers = [
    rest.get(`/classMessage`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                code: 0,
                data: [
                    {
                        id: 1,
                        name: '课程',
                        imgSrc: 'https://giffiles.aphacoders.com/211/211265.gif'
                    }
                ],
                mesg: 'success',
            })
        );
    }),
];