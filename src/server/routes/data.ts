import * as Router from 'koa-router'
import DataModel from '../models/data'

const router = new Router()

router.prefix('/data')

router.get('/', async (ctx) => {
    ctx.body = 'data api'
})

router.post('/', async (ctx) => {
    if (!DataModel.CheckPostInput(ctx.request.body)) {
        ctx.status = 400
        ctx.body = 'bad request'
        return
    }

    await DataModel.PostRow(ctx.request.body)
    ctx.status = 201

    ctx.body = 'ok'
})

router.patch('/', async (ctx) => {
    ctx.body = 'data'
})

export const data = router.routes()
