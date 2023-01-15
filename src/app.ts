import express from "express";
import productsRouter from "./Routes/Products.routes";

const app = express();

app.use(express.json());
app.use("/Products", productsRouter);

app.listen(8080, () => console.log("server running on port 8080"));