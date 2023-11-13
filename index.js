const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Gerente = require('./models/Gerente')
const Atividade = require('./models/Atividade')
const Setor = require('./models/Setor')

const PORT = 3000
const hostname = 'localhost'

let log = false
let nome_gerente = ''

// express  
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
// express handlebars 
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// rotas
// post de atividades -------------------------------------------------------------
app.post('/excluir_atividade', async (req,res)=>{
    const num_atividade = req.body.num_atividade
    const pesq = await Atividade.findOne({raw:true, where: {num_atividade:num_atividade}})
    const msg = "Atividade excluída"
    Atividade.destroy({raw:true, where: {num_atividade:num_atividade}})
    res.render('excluir_atividade', {log, msg})
})
app.post('/editar_atividade', async (req, res)=>{
    const num_atividade = req.body.num_atividade
    const nome_atividade = req.body.nome_atividade
    const setorId = req.body.setorId
    const pesq = await Atividade.findOne({raw: true, where: {num_atividade: num_atividade}})
    const dados = {
        num_atividade: num_atividade,
        nome_atividade: nome_atividade,
        setorId: setorId
    }
    if(pesq == null){
        let msg = "Código da atividade não encontrada"
        res.render('editar_atividade', {log, msg})
    }else{
        let msg = "Atividade alterada"
        await Atividade.update(dados,{where: {num_atividade: pesq.num_atividade}})
        res.render('editar_atividade', {log, msg})
    }
})
app.post('/cadastrar_atividade', async (req, res)=>{
    const num_atividade = req.body.num_atividade
    const nome_atividade = req.body.nome_atividade
    const setorId = req.body.setorId
    await Atividade.create({num_atividade, nome_atividade, setorId})
    const msg = "Atividade cadastrada"
    res.render('cadastrar_atividade', {log, msg})
})

// get de atividades --------------------------------------------------------------
app.get('/excluir_atividade', (req, res)=>{
    res.render('excluir_atividade', {log})
})
app.get('/editar_atividade', (req, res)=>{
    res.render('editar_atividade', {log})
})
app.get('/listar_atividade', async (req, res)=>{
    const valores = await Atividade.findAll({raw:true})
    res.render('listar_atividade', {log, valores:valores})
})
app.get('/cadastrar_atividade', (req, res)=>{
    res.render('cadastrar_atividade', {log})
})

// post de setores ----------------------------------------------------------------
app.post('/excluir_setor', async (req,res)=>{
    const num_setor = req.body.num_setor
    const pesq = await Setor.findOne({raw:true, where: {num_setor:num_setor}})
    const msg = "Setor excluído"
    Setor.destroy({raw:true, where: {num_setor:num_setor}})
    res.render('excluir_setor', {log, msg})
})
app.post('/editar_setor', async (req, res)=>{
    const num_setor = req.body.num_setor
    const nome_setor = req.body.nome_setor
    const gerenteId = req.body.gerenteId
    const pesq = await Setor.findOne({raw: true, where: {num_setor: num_setor}})
    const dados = {
        num_setor: num_setor,
        nome_setor: nome_setor,
        gerenteId: gerenteId
    }
    if(pesq == null){
        let msg = "Código do setor não encontrado"
        res.render('editar_setor', {log, msg})
    }else{
        let msg = "Setor alterado"
        await Setor.update(dados,{where: {num_setor: pesq.num_setor}})
        res.render('editar_setor', {log, msg})
    }
})
app.post('/cadastrar_setor', async (req, res)=>{
    const num_setor = req.body.num_setor
    const nome_setor = req.body.nome_setor
    const gerenteId = req.body.gerenteId
    await Setor.create({num_setor, nome_setor, gerenteId})
    const msg = "Setor cadastrado"
    res.render('cadastrar_setor', {log, msg})
})
// get de setores -----------------------------------------------------------------
app.get('/excluir_setor', (req, res)=>{
    res.render('excluir_setor', {log})
})
app.get('/editar_setor', (req, res)=>{
    res.render('editar_setor', {log})
})
app.get('/listar_setor', async (req, res)=>{
    const valores = await Setor.findAll({raw:true})
    res.render('listar_setor', {log, valores:valores})
})
app.get('/cadastrar_setor', (req, res)=>{
    res.render('cadastrar_setor', {log})
})

// rotas principais ---------------------------------------------------------------
app.post('/sistema', async (req, res)=>{
    const email = req.body.email
    const senha = req.body.senha
    const pesq = await Gerente.findOne({where: {email:email, senha:senha}})
    if (pesq == null){
        log = false
        let msg = "Gerente não encontrado"
        res.render('home', {log, msg})
    }
    else{
        log = true
        nome_gerente = pesq.nome
        res.render('sistema', {log, nome_gerente})
    }
})
app.get('/sistema', (req, res)=>{
    res.render('sistema', {log, nome_gerente})
})
app.get('/', (req, res)=>{
    log = false
    res.render('home', {log})
})

// certificação de servidor rodando ---------------------------------------------
conn.authenticate().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log('Servidor rodando')
    })
}).catch((error)=>{
    console.error('Algo deu errado' + error)
})