import {Get, Patch, Post} from '../../server/models/types'
import memoize from '../memoize'
import SqlProvider from '../SqlProvider'

const memoized = memoize()

export default class SQL {
    public static async InsertRow(input: Post): Promise<void> {
        await this.Sql.Insert({
            ...input.row,
            // replacing date to MySQL format
            date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        }, 'title', 'date', 'author', 'description', 'image')
    }

    public static async GetRow(input: Get): Promise<string> {
        if (input.id) {
            return await this.Sql.ReadId(input.id)
        }

        // limit to 100 by default
        if (!input.page && ! input.size) {
            return await memoized(this.Sql.Read(input.sortBy, { page: 0, size: 100 }), input)
        }

        return await memoized(this.Sql.Read(input.sortBy, { page: input.page, size: input.size }), input)
    }

    public static async UpdateRow(input: Patch): Promise<void> {
        await this.Sql.Update(input.id, {
            ...input.row,
            // replacing date to MySQL format
            date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        }, 'title', 'date', 'author', 'description', 'image')
    }

    private static Sql = new SqlProvider()
}
