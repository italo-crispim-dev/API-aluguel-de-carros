import express from 'express'
import { Veiculo } from './veiculo.js'
import { sequelize } from './database/db.js'
import veiculoRoutes from './routes/veiculo.route.js'


const app  = express();
app.use(express.json());
app.use('/veiculos', veiculoRoutes);


(async  () => {
    try{
        await sequelize.sync();
        console.log("Banco sicronizado")

    } catch(error){
        console.error(error);
    }
})()

app.post('/veiculos', async (req, res) =>{

    const novoVeiculo = await Veiculo.create({
        nome: "BMW",
        placa: "oda-31f2",
        valor_diaria: 400,
        modelo: "F91",
        ano: 2023
    })

    res.status(201).json(novoVeiculo)

})

app.get('/veiculos/:id', async (req, res) =>{
    const veiculo = await Veiculo.findByPk(req.params.id)
    res.status(200).json(veiculo);
})

app.get('/veiculos', async (req, res) => {
    const {nome, ano , valor_diaria} = req.query;

    const where = {}

    if(nome){
        where.nome = nome;
    }
    if(ano){
        where.ano = ano;
    }
    if(valor_diaria){
        where.valor_diaria = valor_diaria;
    }

    const veiculos = await Veiculo.findAll({ where });

    res.status(200).json(veiculos);
})

app.put('/veiculos/:id', async (req, res) =>{
    const veiculo = await Veiculo.findByPk(req.params.id);

    if(!veiculo){
        return res.status(404).json({
            mensagem: 'Veiculo não encontrado'
        })
    }

    await veiculo.update(req.body)

    res.status(200).json(veiculo);
})

app.delete('/veiculos/:id', async (req,res) => {
    const veiculo =  await Veiculo.findByPk(req.params.id);

    if(!veiculo){
        return res.status(404).json({
            mensagem: 'Veiculo não encontrado'
        })
    }
    await veiculo.destroy();

    res.status(200).json({message: 'Veiculo deletado com sucesso'})
})

app.listen(3000);