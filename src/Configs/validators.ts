import { body, check } from 'express-validator';

// Create the validators to use for each route

const paginatedListValidator = [
    check("page").exists().withMessage("Você deve passar qual é a pagina na url")
    .isInt({ min: 1 }).withMessage("O valor da página tem que ser um inteiro maior ou igual a 1"),
    check("itemsPerPage")
    .exists().withMessage("Você deve passar a quantidade de items por página na url")
    .isInt({ min: 1 }).withMessage("A quantidade de items por página tem que ser um inteiro maior ou igual a 1")
];

const addProductValidator = [
    body("name")
        .isString().withMessage("O campo name deve ser uma string").trim().not().isEmpty().withMessage("O campo name deve ser preenchido"),
    body("category")
        .isString().withMessage("O campo category deve ser uma string").trim().not().isEmpty().withMessage("O campo category deve ser preenchido"),
    body("quantity").isInt({min: 1}).withMessage("O campo quantity deve ser um valor inteiro maior ou igual a 1")
];

const updateProductValidator = [
    body("name")
        .isString().withMessage("O campo name deve ser uma string").trim().not().isEmpty().withMessage("O campo name deve ser preenchido").optional(),
    body("category")
        .isString().withMessage("O campo category deve ser uma string").trim().not().isEmpty().withMessage("O campo category deve ser preenchido").optional(),
    body("status")
        .isString().withMessage("O campo status deve ser uma string")
        .toUpperCase().trim().not().isEmpty().withMessage("O campo status deve ser preenchido")
        .isIn(["ACTIVE", "INACTIVE"]).withMessage("Os valores possiveis são ACTIVE ou INACTIVE").optional(),
    body("quantity").isInt({min: 1}).withMessage("O campo quantity deve ser um valor inteiro maior ou igual a 1").optional()
];

export { paginatedListValidator, addProductValidator, updateProductValidator } ;