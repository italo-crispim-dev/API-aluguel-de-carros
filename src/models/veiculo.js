import { DataTypes } from "sequelize";
import {sequelize } from "../database/db.js"

const Veiculo = sequelize.define('Veiculo',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    placa: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    valor_diaria:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    ano:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "DISPONIVEL"
    }    
})

export {Veiculo};