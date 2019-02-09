import * as Joi from 'joi'

type Row = {
    row?: {
        title?: string,
        date?: string,
        author?: string,
        description?: string,
        image?: string,
    },
}

const RowSchema = Joi.object().keys({
    title: Joi.string().required(),
    date: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
})

export { Row, RowSchema }
