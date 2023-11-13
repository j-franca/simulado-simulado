const DataTypes = require('sequelize')
const db = require('../db/conn')

const Gerente = db.define('gerente', {
    nome:{
        type: DataTypes.STRING(30)
    },
    email:{
        type: DataTypes.STRING(30)
    },
    senha:{
        type: DataTypes.STRING(30)
    }
},{
    updatedAt: false,
    createdAt: false
})

// Gerente.sync({force:true})

module.exports = Gerente