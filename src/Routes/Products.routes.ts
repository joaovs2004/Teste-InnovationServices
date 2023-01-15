import { Router } from "express";
import { listAllProducts, listById, paginatedList, addProduct, deleteProduct, updateProduct } from "../Controllers/Products.controller";
import { paginatedListValidator, addProductValidator, updateProductValidator } from "../Configs/validators";

const productsRouter = Router();

productsRouter.get("/listAll", listAllProducts);
productsRouter.get("/listById/:productId", listById);
productsRouter.get("/paginatedList", paginatedListValidator, paginatedList);
productsRouter.post("/add", addProductValidator, addProduct);
productsRouter.delete("/delete/:productId", deleteProduct);
productsRouter.patch("/update/:productId", updateProductValidator, updateProduct);

export default productsRouter;