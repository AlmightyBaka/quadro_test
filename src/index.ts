import koa from 'koa'
import koa_bodyparser from 'koa-bodyparser'
import json from 'koa-json'
import logger from 'koa-logger'
import onerror from 'koa-onerror'

import index from './routes/index'
import users from './routes/users'

const app = koa()

// error handler
onerror(app)

// global middlewares
app.use(koa_bodyparser())
app.use(json())
app.use(logger())

app.use(function *(next) {
    const start: Date = new Date()
    yield next
    const ms: number = new Date().valueOf() - start.valueOf()
    console.log(`${this.method} ${this.url} - ${ms}`)
})

// routes definition
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})
