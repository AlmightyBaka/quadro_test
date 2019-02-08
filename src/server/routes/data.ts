import * as Router from 'koa-router'

const router = new Router()

router.prefix('/data')

router.get('/', async (ctx) => {
    ctx.body = { data: 'data' }
})

router.post('/', async (ctx) => {
    ctx.status = 201
    console.log(ctx.request.body)
    ctx.body = ctx.request.body
})

router.patch('/', async (ctx) => {
    ctx.body = 'data'
})

export const data = router.routes()
