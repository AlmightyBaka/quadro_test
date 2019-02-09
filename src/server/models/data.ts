import * as Joi from 'joi'

import SQL from '../../data/Sql'
import { Get, GetSchema, Row, RowSchema } from './types'

export default class DataModel {
    public static CheckGetInput(input: string): boolean {
        return this.parseGet(input) as boolean
    }

    public static CheckPostInput(input: string): boolean {
        return this.parseRow(input) as boolean
    }

    public static async PostRow(input: string) {
        const row: Row = this.parseRow(input)

        await SQL.InsertRow(row)
    }

    public static async GetRow(input: string) {
        const get: Get = this.parseGet(input)

        return await SQL.GetRow(get)
    }

    private static parseGet(input: string): Get {
        const { error } = Joi.validate(input, GetSchema)

        if (!error) {
            return input as Get
        }

        return null
    }

    private static parseRow(input: string): Row {
        let row: Row

        try {
            row = JSON.parse(input)
        } catch (err) {
            return null
        }

        if (!row.row) {
            return null
        }

        const { error } = Joi.validate(row.row, RowSchema)

        if (!error) {
            return row
        }

        return null
    }
}
