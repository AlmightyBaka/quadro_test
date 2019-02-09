import * as mysql from 'mysql'

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
}
