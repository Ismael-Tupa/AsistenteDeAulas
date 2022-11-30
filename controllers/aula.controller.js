const aulaCtrl = {};
const con = require('../helpers/Conexion.helper');

aulaCtrl.renderListAula = (req, res)=>{
    const sql = "SELECT * from aulas";
    con.query(sql, (err, rows) => {
        if (err) throw err
        const aula = rows;
        res.render('layouts/aula/aula', {aula}); 
        req.flash('error', null);
        req.flash('success_msg', null); 
    })
}

aulaCtrl.createFromAula = (req,res)=>{
    res.render('layouts/aula/new-aula');
}
aulaCtrl.createAula = (req,res)=>{
    var result = null;
    const { nombre, cantidad , descripcion } = req.body;
    const select = "select * from aulas where nombre=?";
    con.query(select, req.body.nombre, (error, rows) => {
        if (error) throw error;
        result = rows;
    })
    if(result == null){
        const insert = "INSERT INTO aulas set ?";
        con.query(insert, [req.body], (error, rows) => {
            if (error) throw error
        })
        var estado = "Desocupado";
        con.query("insert into estadoAula values ('',?,(select last_insert_id() from aulas group by last_insert_id()),null);", [estado], (error,rows)=>{
            if(error) throw error
        })
        req.flash('success_msg', 'Aula agregada');
        res.redirect('/aula');
    }
    req.flash('error', 'Esta aula ya esta registrada');
    res.redirect('/aula/createFrom');
    
}
var nombreDeActualizacion;
aulaCtrl.updateFromAula = (req,res)=>{
    const select = "select * from aulas where nombre=?";
    nombreDeActualizacion = req.params.nombre;
    con.query(select, [nombreDeActualizacion], (error, rows) => {
        if (error) throw error;
        const result = JSON.parse(JSON.stringify(rows));
        
        res.render('layouts/aula/new-aula',{result});
    })
    
    console.log("<<<<",nombreDeActualizacion);
}
aulaCtrl.updateAula = (req,res)=>{
    const insert = "update aulas set ? where nombre=?";
    console.log("{{{{{{{",req.body)
    con.query(insert, [req.body, nombreDeActualizacion], (error, rows) => {
        if (error) throw error
        console.log("----",rows);
        
    })
    req.flash('success_msg', 'Aula actualizada');
    res.redirect('/aula');   
}
var nombreDeActualizacion = "";
aulaCtrl.deleteAula = (req,res)=>{
    var nombreD = String(req.params.nombre);
    console.log("jjjj",req.params.nombre);
    const select = "select * from aulas where nombre=?";
    var result = "";
    con.query(select, [req.params.nombre], (error, rows) => {
        if (error) throw error;
        result = rows;
        const select2 = "select * from estadoAula where aula=? and estado=? ";
        var estado = "Desocupado";
        con.query(select2, [result[0].id_aula, estado], (error, rows) => {
            if (error) throw error;
            result = JSON.parse(JSON.stringify(rows));
            console.log(">>>>>>",result);
            if(result == []){
                con.query("delete from estadoAula where aula=?", [result[0].aula], (error,rows)=>{
                    if (error) throw error;
                    console.log("se ea");
                })
                con.query("delete from aulas where id_aula=?", [result[0].aula], (error,rows)=>{
                    if (error) throw error;
                    console.log("se a");
                })
                req.flash('success_msg', 'Aula Eliminada');
                res.redirect('/aula');
            }else{
                req.flash('error', 'esta aula esta ocupada');
                res.redirect('/aula')
            }
        })
        
    })
    
}

module.exports = aulaCtrl;