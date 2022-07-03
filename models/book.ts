import { Schema } from 'mongoose';

interface IBook {
    title: string,
    usage_count: number
}

const bookScheme = new Schema<IBook>({
    title: {
        type:String, required: true
    },
    usage_count:{
      type:Number, required: true, default: 0
    }
})

export {bookScheme, IBook}