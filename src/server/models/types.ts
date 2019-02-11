import * as Joi from 'joi'

type Pagination = { page: number, size: number }

type Row = {
    title?: string,
    date?: string,
    author?: string,
    description?: string,
    image?: string,
}

type Post = {
    row?: Row,
}

type Get = {
    id?: number,
    sortBy?: string,
    page?: number,
    size?: number,
}

type Patch = {
    id: number,
    row: Row,
}

const PostSchema = Joi.object().keys({
    row: Joi.object().keys({
        title: Joi.string(),
        date: Joi.string(),
        author: Joi.string(),
        description: Joi.string(),
        image: Joi.string(),
    }),
})

const GetSchema = Joi.object().keys({
    id: Joi.number(),
    sortBy: Joi.string(),
    page: Joi.string(),
    size: Joi.string(),
})

const PatchSchema = Joi.object().keys({
    id: Joi.string().required(),
    row: Joi.object().keys({
        id: Joi.string().required(),
        title: Joi.string(),
        date: Joi.string(),
        author: Joi.string(),
        description: Joi.string(),
        image: Joi.string(),
    }),
})

export { Pagination, Post, Get, Patch, PostSchema, GetSchema, PatchSchema }
