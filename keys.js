require('dotenv').config()  
module.exports = {
    database: {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'fotos',
        port:9999
    },
    database_cc:{
        host: process.env.NODE_ENV_HOST,
        user: process.env.NODE_ENV_USER,
        password: process.env.NODE_ENV_PASSWORD,
        database: process.env.NODE_ENV_DB
    }
}