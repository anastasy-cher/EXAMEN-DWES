const mysql = require('mysql2/promise')
const { database, database_cc } = require('./keys')
let db_utilizar

if(process.env.ENTORNO == 'develop'){
    db_utilizar = database
}else{
    db_utilizar = database_cc
}

console.log(db_utilizar)
const pool = mysql.createPool(db_utilizar)
module.exports = pool