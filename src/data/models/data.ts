import { Get, Row } from '../../server/models/types'
import SqlProvider from '../SqlProvider'

export default class SQL {
    public static InsertRow(row: Row): string {
        const result = this.Sql.Insert({
            ...row.row,
            // replacing date to MySQL format
            date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        }, 'title', 'date', 'author', 'description', 'image')

        return result
    }

    public static async GetRow(input: Get): Promise<string> {
        if (input.id) {
            return await this.Sql.ReadId(input.id)
        }

        return await this.Sql.Read(input.sortBy, { page: input.page, size: input.size })
    }
    private static Sql = new SqlProvider()
}
