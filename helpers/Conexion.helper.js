const mysql = require('mysql');

const {DB_HOSTX,DB_USERX,DB_PASSWORDX,DB_DATABASEX} = process.env;

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "ins_aaa"
});

connection.connect((err)=>{
    if(err){
        console.log('El error de conexion es: '+err);
        return;
    }
    console.log("¡Conexion exitosa!");
});

module.exports = connection;