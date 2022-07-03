import { Model } from "mongoose";
import { IUser } from '../models/user'
import { IBook } from '../models/book'

import Repository from '../core/Repository'
import StatConnector from '../connectors/StatConnector'

//reduce doublication of properties of UserService classe

class UserService {
    public repository: Repository<IUser>;
    public bookRepository: Repository<IBook>;
    public statConnector: StatConnector;

    constructor(repository: Repository<IUser>, bookRepository: Repository<IBook>, statConnector: StatConnector) {
        this.repository = repository;
        this.bookRepository = bookRepository;
        this.statConnector = statConnector;
    }

    list(query: any) {
        return this.repository.list(query);
    }

    create(params: Model<IUser>) {
        return this.repository.create(params);
    }

    get(id: string) {
        return this.repository.get(id);
    }

    delete(id: string) {
        return this.repository.delete(id);
    }

    update(id: string, data: Model<IUser>[]) {
        return this.repository.update(id, data);
    }

    bookList(id: string) {
        return this.repository.get(id, 'books');
    }

    updateBooks(id: string, books: Array<IBook>) {
        return this.bookList(id)
            .then(async (userWithBooks: any) => {
                const oldBooks: Array<IBook> = userWithBooks?.books;
                const booksSet = new Set(books);
                const returned = oldBooks.filter((item: any) => {
                    return !booksSet.has(item._id.toString())
                });

                const stats = await this.statConnector.getStats();
                return Promise
                    .all(returned.map((book: any) => {
                        return this.bookRepository.update(book._id, { usage_count: book.usage_count + 1 })
                    })).then(() => Object.assign(userWithBooks, { books, rate: userWithBooks.rate + stats }).save());
            });

    }
}

export default UserService
