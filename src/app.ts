import express from "express";
import productsRouter from "./Routes/Products.routes";
import municipalitiesRouter from "./Routes/Municipalities.routes";
import db from "./Configs/db";

const app = express();

// I need to synchronize the database, because if it doesn't exist, the queries will give an error
db.sync().then(() => {
    console.log("Database synchronized");
});

app.use(express.json());
app.use("/Products", productsRouter);
app.use("/Municipalities", municipalitiesRouter);

app.listen(8080, () => console.log("server running on port 8080"));