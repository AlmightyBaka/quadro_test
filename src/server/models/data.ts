import * as Joi from 'joi'

import { ObjectSchema } from 'joi'
import SQL from '../../data/models/data'
import { Get, GetSchema, Patch, PatchSchema, Post, PostSchema } from './types'

export default class DataModel {
    public static ValidateGetInput(input: string): Get | null {
        return this.validateObject(input, GetSchema)
    }

    public static ValidatePostInput(input: string): Post | null {
        return this.parseJson<Post>(input, PostSchema)
    }

    public static ValidatePatchInput(input: string): Patch | null {
        return this.parseJson<Patch>(input, PatchSchema)
    }

    public static async PostRow(input: Post): Promise<void> {
        await SQL.InsertRow(input)
    }

    public static async GetRow(input: Get): Promise<any> {
        return await SQL.GetRow(input)
    }

    public static async PatchRow(input: Patch): Promise<void> {
        return await SQL.UpdateRow(input)
    }

    private static parseJson<T>(input: string, schema: ObjectSchema): T | null {
        let result: T

        try {
            result = JSON.parse(input)
        } catch (err) {
            return null
        }

        return this.validateObject<T>(result, schema)
    }

    private static validateObject<T>(input: any, schema: ObjectSchema): T | null {
        const { error } = Joi.validate(input, schema)

        if (!error) {
            return input as T
        }

        return null
    }
}
