const Sequelize = require('sequelize')
const sequelize = new Sequelize('prova_01.11', 'root', 'senai', {
    host: 'localhost',
    dialect: 'mysql'
})

// sequelize.sync().then(()=>{
//     console.log('Conectado ao banco')
// }).catch((error)=>{
//     console.error('Algo deu errado ao conectar o banco' + error)
// })

module.exports = sequelize