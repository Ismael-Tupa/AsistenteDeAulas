const ocupanteCtrl = {};
const con = require('../helpers/Conexion.helper');

ocupanteCtrl.renderListOcupante = (req, res)=>{
    const sql = "SELECT * from ocupante";
    con.query(sql, (err, rows) => {
        if (err) throw err
        const ocupante = rows;
        res.render('layouts/ocupante/ocupante', {ocupante});  
    })
}

ocupanteCtrl.createFromOcupante = (req,res)=>{
    res.render('layouts/ocupante/new-ocupante');
}
ocupanteCtrl.createOcupante = (req,res)=>{
    const { nombre, carrera , cargo, cuil } = req.body;
    const insert = "INSERT INTO ocupante set ?";
    con.query(insert, [req.body], (error, rows) => {
        if (error) throw error;
        req.flash('success_msg', 'Usuario agregado');
        res.redirect('/ocupante');
    })    
}
var cuilDeActualizacion;
ocupanteCtrl.updateFromOcupante = (req,res)=>{
    const select = "select * from ocupante where cuil=?";
    cuilDeActualizacion = req.params.cuil;
    con.query(select, [cuilDeActualizacion], (error, rows) => {
        if (error) throw error;
        const result = JSON.parse(JSON.stringify(rows));
        console.log(result);
        res.render('layouts/ocupante/new-ocupante',{result});
    })
    
}
ocupanteCtrl.updateOcupante = (req,res)=>{
    const insert = "update ocupante set ? where cuil=?";
    console.log("{{{{{{{",req.body)
    con.query(insert, [req.body, cuilDeActualizacion], (error, rows) => {
        if (error) throw error
        console.log("----",rows);
        
    })
    req.flash('success_msg', 'Usuario actualizado');
    res.redirect('/ocupante'); 
}
ocupanteCtrl.deleteOcupante = (req,res)=>{
    con.query("delete from ocupante where cuil=?", [req.params.cuil], (error,rows)=>{
        if (error) throw error;
        console.log("se ea");
    })
    req.flash('success_msg', 'Usuario eliminado');
    res.redirect('/ocupante'); 
}


module.exports = ocupanteCtrl;

