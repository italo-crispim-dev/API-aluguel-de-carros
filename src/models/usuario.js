import {sequelize } from "../database/db.js"
import { DataTypes } from "sequelize";


const Usuario = sequelize.define('Usuario', {
    id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
    nomeUsuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM("CLIENTE", "ADMIN"),
        allowNull: false,
        defaultValue: "CLIENTE"
    }
})

export {Usuario}