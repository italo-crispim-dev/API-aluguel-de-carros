import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const Aluguel = sequelize.define('Aluguel',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_veiculo:{
        type: DataTypes.INTEGER,
        allowNull: false,
        
    },
    data_inicio:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    data_fim:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    valor_total:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ATIVO"
    }
})

export {Aluguel}