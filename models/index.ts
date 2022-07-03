import { model } from 'mongoose'

import {bookScheme, IBook} from './book'
import {userScheme, IUser} from './user'

const Book = model<IBook>("Book", bookScheme);
const User = model<IUser>("User", userScheme);

