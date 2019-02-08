import * as Koa from 'koa'
import * as bodyParser from 'koa-body'
import * as onError from 'koa-onerror'

import { config } from './server/config'
import { logger } from './server/logging'
import { data } from './server/routes/data'
import { index } from './server/routes/index'

const app = new Koa()
onError(app)

app.use(logger)
app.use(bodyParser())
app.use(data)
app.use(index)

app.listen(config.port)

console.log(`Server running on port ${config.port}`)
