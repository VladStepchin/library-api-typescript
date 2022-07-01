import { Schema,Types, model, connect } from 'mongoose';

interface IUser {
    name: string,
    age: number,
    books: Schema.Types.ObjectId
}

const userSchema = new Schema<IUser>({
    name: {
        type:String, required: true
    },
    age: {
        type:Number, required: true
    },
    books:{
        type: Schema.Types.ObjectId, ref: 'Book'
    }
})

export default userSchema