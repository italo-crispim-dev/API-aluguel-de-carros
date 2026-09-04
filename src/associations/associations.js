import { Veiculo } from "../models/veiculo";
import { Aluguel } from "../models/aluguel";

Veiculo.hasMany(Aluguel,{
    foreignKey: 'id_veiculo'
});

Aluguel.belongsTo(Veiculo, {
    foreignKey: 'id_veiculo'
})