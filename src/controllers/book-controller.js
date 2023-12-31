import bookService from "../services/book-service.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;

        const result = await bookService.create(user, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create
}