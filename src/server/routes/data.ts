import * as Router from 'koa-router'
import DataModel from '../models/data'

const router = new Router()

router.prefix('/data')

router.get('/', async (ctx) => {
    const input = DataModel.ValidateGetInput(ctx.query)
    if (input === null) {
        ctx.status = 400
        ctx.body = 'bad request'
        return
    }

    ctx.body = await DataModel.GetRow(input)
})

router.post('/', async (ctx) => {
    const input = DataModel.ValidatePostInput(ctx.request.body)
    if (input === null) {
        ctx.status = 400
        ctx.body = 'bad request'
        return
    }

    await DataModel.PostRow(ctx.request.body)
    ctx.status = 201

    ctx.body = 'ok'
})

router.patch('/', async (ctx) => {
    if (!DataModel.ValidatePatchInput(ctx.request.body)) {
        ctx.status = 400
        ctx.body = 'bad request'
        return
    }

    // await DataModel.PatchRow(ctx.request.body)
    ctx.status = 201

    ctx.body = 'ok'
})

export const data = router.routes()
