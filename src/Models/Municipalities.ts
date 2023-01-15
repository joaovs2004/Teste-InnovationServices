import db from "../Configs/db";
import { DataTypes } from "sequelize";

const Municipalities = db.define("Municipalities", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    // Remove createAt and updateAt columns
    createdAt: false,
    updatedAt: false
});

export default Municipalities;