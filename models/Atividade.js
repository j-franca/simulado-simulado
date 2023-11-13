const DataTypes = require('sequelize')
const db = require('../db/conn')
const Setor = require('./Setor')

const Atividade = db.define('atividade', {
    num_atividade:{
        type: DataTypes.STRING(30)
    },
    nome_atividade:{
        type: DataTypes.STRING(30)
    }
},{
    updatedAt: false,
    createdAt: false
})

Setor.hasMany(Atividade)
Atividade.belongsTo(Setor)

// Atividade.sync({force:true})

module.exports = Atividade