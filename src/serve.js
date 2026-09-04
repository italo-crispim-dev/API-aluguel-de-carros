import "dotenv/config"
import express from 'express';
import { sequelize } from './database/db.js';
import veiculoRoutes from './routes/veiculo.route.js';
import aluguelRoutes from './routes/aluguel.route.js';
import usuarioRoutes from './routes/usuario.route.js';
import authRoutes from './routes/auth.route.js'
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from '../src/config/swagger.json' with {type: 'json'};
import { criarAdminPadrao } from "./database/adm.js";

const app  = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/veiculos', veiculoRoutes);
app.use('/alugueis', aluguelRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/usuarios', usuarioRoutes);

(async  () => {
    try{
        await sequelize.sync();
        console.log("Banco sicronizado");

        await criarAdminPadrao();

    } catch(error){
        console.error(error);
    }
})()


app.listen(3000, () =>{
    console.log("Server rodando na porta 3000");
});