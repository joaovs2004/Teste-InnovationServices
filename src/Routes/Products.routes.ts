import { Router } from "express";
import { listAllProducts, listById, paginatedList, addProduct, deleteProduct, updateProduct } from "../Controllers/Products.controller";
import { paginatedListValidator, addProductValidator, updateProductValidator } from "../Configs/validators";

const router = Router();

router.get("/listAll", listAllProducts);
router.get("/listById/:productId", listById);
router.get("/paginatedList", paginatedListValidator, paginatedList);
router.post("/add", addProductValidator, addProduct);
router.delete("/delete/:productId", deleteProduct);
router.patch("/update/:productId", updateProductValidator, updateProduct);

export default router;