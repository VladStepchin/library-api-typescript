import mongoose from 'mongoose'

import bookScheme from './book'
import userScheme from './user'

const Book = mongoose.model("Book", bookScheme);
const User = mongoose.model("User", userScheme);

