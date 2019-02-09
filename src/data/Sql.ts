import { Row } from '../server/models/types'
import SqlProvider from './SqlProvider'

export default class SQL {
    public static InsertRow(row: Row): string {
        const result = this.Sql.Insert({
            ...row.row,
            // replacing date to MySQL format
            date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        }, 'title', 'date', 'author', 'description', 'image')

        return result
    }
    private static Sql = new SqlProvider()
}
