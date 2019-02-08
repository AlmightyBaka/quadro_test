
export interface IConfig {
    port: number
    prettyLog: boolean
}

const config: IConfig = {
    port: Number(process.env.NODE_PORT) || 3000,
    prettyLog: process.env.NODE_ENV === 'development',
}

export { config }
