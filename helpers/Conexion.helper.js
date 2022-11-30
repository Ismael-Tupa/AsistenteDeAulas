const mysql = require('mysql');

const {DB_HOSTX,DB_USERX,DB_PASSWORDX,DB_DATABASEX} = process.env;

const connection = mysql.createConnection({
    host: process.env.DB_HOSTX,
    user: process.env.DB_USERX,
    password: process.env.DB_PASSWORDX,
    database: process.env.DB_DATABASEX
});

connection.connect((err)=>{
    if(err){
        console.log('El error de conexion es: '+err);
        return;
    }
    console.log("¡Conexion exitosa!");
});

module.exports = connection;