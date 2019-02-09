import * as mysql from 'mysql'
import { Pagination } from '../server/models/types'

export default class SqlProvider {
    private connection
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'dandy',
            password: 'password',
            database: 'books',
        })
    }

    public Insert(data: any, ...fields: string[]): string {
        try {
            this.connection.connect()

            this.connection.query(`insert into books (${fields.join(',')})
                                    values ("${fields.map((field) => data[field]).join('","')}")`)

            this.connection.end()

            return 'ok'
        } catch (err) {
            return err
        }
    }

    public ReadId = (id: number): Promise<any> => new Promise((resolve, reject) => {
        try {
            this.connection.connect()

            this.connection.query(`select * from books where id = ${id}`, (err, results) => {
                if (err) {
                    return reject (err)
                }

                return resolve(results)
            })

            this.connection.end()
        } catch (err) {
            return reject (err)
        }
    })

    public Read(sortBy?: string, pagination?: Pagination): string {
        try {
            this.connection.connect()

            this.connection.query(`select * from books order by ${sortBy || 'id'}`)

            this.connection.end()

            return 'ok'
        } catch (err) {
            return err
        }
    }
}
