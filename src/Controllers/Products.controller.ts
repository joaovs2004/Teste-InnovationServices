import { Request, Response } from "express";
import { validationResult } from "express-validator";
import db from "../Configs/db";
import Products from "../Models/Products";

// I need to synchronize the database, because if it doesn't exist, the queries will give an error
db.sync().then(() => {
    console.log("Database synchronized");
});

const listAllProducts = (req: Request, res: Response) => {
    Products.findAll().then((products) => {
        res.json(products);
    }).catch((err) => {
        res.status(500).json({ msg: "Algo deu errado", error: err});
    });
};

const listById = (req: Request, res: Response) => {
    Products.findOne({
        where: {
            id: req.params.productId
        }
    }).then((product) => {
        // The method findOne return null if no product is found
        if(product == null) return res.status(404).json("Produto não encontrado");

        res.json(product);
    }).catch((err) => {
        res.status(500).json({ msg: "Algo deu errado", error: err });
    });
};

const paginatedList = (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).json({ msg: "Algo deu errado", errors: errors.array() });

    const numberItemsPerPage = Number(req.query.itemsPerPage)
    const position = (Number(req.query.page) - 1) * numberItemsPerPage; // This value is the number of items the findAll method will skip

    Products.findAll({
        offset: position,
        limit: numberItemsPerPage
    }).then((products) => {
        res.json(products);
    }).catch((err) => {
        res.status(500).json({ msg: "Algo deu errado", error: err });
    })
};

const addProduct = (req: Request, res: Response) => {
    // I check the validation, if the value is not empty I return a code 400 to indicate that some submitted parameter is invalid
    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).json({ msg: "Algo deu errado", errors: errors.array() });

    Products.create({
        name: req.body.name,
        category: req.body.category,
        status: "ACTIVE",
        quantity: req.body.quantity
    }).then(() => {
        res.json("Produto inserido");
    }).catch((err) => {
        res.status(500).json({ msg: "Algo deu errado", error: err });
    });
};

const deleteProduct = (req: Request, res: Response) => {
    const currentDate = new Date().toISOString(); // Here I get the current time on the format used by created_at and update_at from sequelize

    Products.update({
        status: "INACTIVE",
        deleted_at: currentDate
    }, {
        where: {
            id: req.params.productId
        },
    }).then((affectedRows) => {
        // The affectedRows is a array with one position, if the value is 0, it means that there are no products with the indicated id.
        if(affectedRows[0] == 0) return res.status(404).json("Produto não encontrado");

        res.json("Produto deletado com sucesso");
    }).catch((err) => {
        res.status(500).json({ msg: "Algo deu errado", error: err});
    });
};

const updateProduct = (req: Request, res: Response) => {
    // If the body is empty, I return a code 400 to indicate that you must insert the fields you want to update
    if(Object.keys(req.body).length == 0) return res.status(400).json(
        "Insira os campos que deseja atualizar. Os campos disponíveis são: name, category, status, quantity"
    );

    // I check the validation, if the value is not empty I return a code 400 to indicate that some submitted parameter is invalid
    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).json({ msg: "Erro, algum parâmetro está inválido", errors: errors.array() });

    Products.update({
        name: req.body.name,
        category: req.body.category,
        status: req.body.status,
        quantity: req.body.quantity
    }, {
        where: {
            id: req.params.productId
        },
        returning: true
    }).then((affectedRows) => {
        /*
            The difference here to the affectedRows above, is that I have passed the return option = true,
            so I can differentiate if the error is because the product was not found or if it was because of some invalid parameter

            Explanation of the first condition

            If only one parameter is passed and it is not in the product model,
            the array affectedRows will get only one position, so if this is the case
            I return a code 400 to indicate that some submitted parameter is invalid

            Note: When several parameters are passed and one is invalid it is just ignored

            Explanation of the second condition

            When the parameters are valid, the array affectedRows gets two positions, the last one being the number of affected rows,
            if this value is 0, it means that there are no products with the indicated id.
            In this case I return a 404 code to indicate that the product was not found
        */
        if(affectedRows.length < 2) return res.status(400).json("Parâmetro invalido");
        if(affectedRows[affectedRows.length - 1] == 0) return res.status(404).json("Produto não encontrado");

        res.json("Produto atualizado com sucesso");
    }).catch((err) => {
        res.status(500).json({ msg: "Algo deu errado", error: err});
    });
};

export { listAllProducts, listById, paginatedList, addProduct, deleteProduct, updateProduct };