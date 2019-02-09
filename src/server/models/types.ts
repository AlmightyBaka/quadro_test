import * as Joi from 'joi'

type Pagination = { page: number, size: number }

type Row = {
    row?: {
        title?: string,
        date?: string,
        author?: string,
        description?: string,
        image?: string,
    },
}

type Get = {
    id?: number,
    sortBy?: string,
    pagination?: Pagination,
}

const RowSchema = Joi.object().keys({
    title: Joi.string().required(),
    date: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
})

const GetSchema = Joi.object().keys({
    id: Joi.number(),
    sortBy: Joi.string(),
})

export { Pagination, Row, Get, RowSchema, GetSchema }
