import { Schema,Types, model, connect } from 'mongoose';

interface IUser {
    name: string,
    age: number,
    books: Types.ObjectId,
    rate: number
}

const userScheme = new Schema<IUser>({
    name: {
        type:String, required: true
    },  
    age: {
        type:Number, required: true
    },
    books: [
        {
            type: Schema.Types.ObjectId, ref: 'Book' 
        }
    ],
    rate: {
        type: Number,
        default: 0,
      }
})

export { userScheme, IUser }