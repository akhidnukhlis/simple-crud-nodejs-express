import Joi from "joi";

const createBookValidation = Joi.object({
    tittle: Joi.string().max(100).required(),
    description: Joi.string().max(100).required(),
    price: Joi.number().integer().required(),
    image: Joi.string().max(100).required(),
    categories: Joi.string().max(100).required(),
    keywords: Joi.string().max(100).required(),
    stock: Joi.number().integer().required(),
    publisher: Joi.string().max(100).required()
});

export {
    createBookValidation
}