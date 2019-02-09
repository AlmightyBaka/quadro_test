import * as Joi from 'joi'

import SQL from '../../data/Sql'
import { Row, RowSchema } from './types'

export default class DataModel {
    public static CheckPostInput(input: string): boolean {
        return this.getRow(input) as boolean
    }

    public static async PostRow(input: string) {
        const row: Row = this.getRow(input)

        await SQL.InsertRow(row)
    }

    private static getRow(input: string): Row {
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
