import * as dotenv from 'dotenv'
import * as mysql from 'mysql'

import { Pagination } from '../server/models/types'

dotenv.config()

export default class SqlProvider {
    private connection
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        })

        this.connection.connect()
    }

    public createTableIfNotExists = (): Promise<string> => new Promise((resolve, reject) =>  {
        try {
            this.connection.query(`create table if not exists books (
                                      id int(11) NOT NULL AUTO_INCREMENT,
                                      title varchar(255) DEFAULT NULL,
                                      date date DEFAULT NULL,
                                      author varchar(255) DEFAULT NULL,
                                      description varchar(255) DEFAULT NULL,
                                      image varchar(255) DEFAULT NULL,
                                      PRIMARY KEY (id)
                                  );`,
                (err, results) => {
                    if (err) {
                        return reject (err)
                    }
                    console.log(0)

                    return resolve(results)
                })
            return 'ok'
        } catch (err) {
            return err
        }
    })

    public Insert = (data: any, ...fields: string[]): Promise<string> => new Promise((resolve, reject) =>  {
        try {
            this.connection.query(`insert into books (${fields.join(',')})
                                    values ("${fields.map((field) => data[field]).join('","')}")`,
                (err, results) => {
                    if (err) {
                        return reject (err)
                    }

                    return resolve(results)
                })
            return 'ok'
        } catch (err) {
            return err
        }
    })

    public ReadId = (id: number): Promise<any> => new Promise((resolve, reject) => {
        try {
            this.connection.query(`select * from books where id = ${id}`, (err, results) => {
                if (err) {
                    return reject (err)
                }

                return resolve(results)
            })
        } catch (err) {
            return reject (err)
        }
    })

    public Read = (sortBy?: string, pagination?: Pagination): Promise<any> => new Promise((resolve, reject) => {
        try {
            if (!pagination.page && !pagination.size) {
                this.connection.query(`select * from books order by ${sortBy || 'id'}`, (err, results) => {
                    if (err) {
                        return reject(err)
                    }

                    return resolve(results)
                })
            } else {
                this.connection.query(`select * from books order by ${sortBy || 'id'} limit
                ${pagination.page * pagination.size}, ${(pagination.page + 1) * pagination.size}`, (err, results) => {
                    if (err) {
                        return reject(err)
                    }

                    return resolve(results)
                })
            }
        } catch (err) {
            return reject (err)
        }
    })

    public Update = (id: number, data: any, ...fields: string[]): Promise<string> => new Promise((resolve, reject) =>  {
        try {
            this.connection.query(`update books
                                   set ${fields.map((field) => `${field} = "${data[field]}"`).join(', ')}
                                   where id = ${id}`,
                (err, results) => {
                    if (err) {
                        return reject (err)
                    }

                    return resolve(results)
                })
            return 'ok'
        } catch (err) {
            return err
        }
    })
}
