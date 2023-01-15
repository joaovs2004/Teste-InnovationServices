// This file is just for do a little configuration for the database
import { Sequelize } from "sequelize";

const db = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite"
});

export default db;