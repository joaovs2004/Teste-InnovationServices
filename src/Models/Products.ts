import db from "../Configs/db";
import { DataTypes } from "sequelize";

const Products = db.define("Products", {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deleted_at: {
        // If the product was not deleted, this column must receive null
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    // Sequelize already provide createAt and updateAt columns, i just rename it to follow what was asked in the database model
    createdAt: "created_at",
    updatedAt: "updated_at"
});

export default Products;