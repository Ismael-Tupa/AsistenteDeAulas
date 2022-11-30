const mysql = require('mysql');

const {DB_HOSTX,DB_USERX,DB_PASSWORDX,DB_DATABASEX} = process.env;

const connection = mysql.createConnection({
    host: "mysql-ismael.alwaysdata.net",
    port: 3306,
    user: "ismael",
    password: "10646367",
    database: "ismael_ins-aaa"
});

connection.connect((err)=>{
    if(err){
        console.log('El error de conexion es: '+err);
        return;
    }
    console.log("¡Conexion exitosa!");
});

module.exports = connection;