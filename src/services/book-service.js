import {createBookValidation} from "../validations/book-validation";
import {prismaClient} from "../applications/database.js";
import {validate} from "../validations/validation.js";
import {v4 as uuid} from "uuid";

const create = async (user, request) => {
    const book = validate(createBookValidation, request);
    book.username = user.username;
    book.id = uuid().toString();

    return prismaClient.book.create({
        data: book,
        select: {
            id: true,
            tittle: true,
            description: true,
            price: true,
            image: true,
            categories: true,
            keywords: true,
            stock: true,
            publisher: true
        }
    });
}

export default {
    create
}