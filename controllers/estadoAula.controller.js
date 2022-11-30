const estadoAulaCtrl = {};
const con = require('../helpers/Conexion.helper');

estadoAulaCtrl.renderListEstadoAula = (req, res)=>{
    var op = String(req.params.op);
    if(op == 'todo'){
        const sql = "SELECT aulas.id_aula,aulas.nombre as 'nombreA',aulas.cantidad,aulas.descripcion,estadoAula.id ,estadoAula.estado, ocupante.idocupante ,ocupante.nombre as 'nombreO',ocupante.cargo, ocupante.cuil FROM aulas left JOIN estadoAula ON aulas.id_aula = estadoAula.aula left join ocupante on estadoAula.ocupante = ocupante.idocupante;";
        con.query(sql, (err, rows) => {
            if (err) throw err
            const estadoAula = JSON.parse(JSON.stringify(rows));
            console.log(rows,typeof op,typeof estadoAula[0].estado);
            res.render('layouts/estadoAula/estadoAula', {estadoAula});  
        })
    }else{
        const sql = "SELECT aulas.id_aula,aulas.nombre as 'nombreA',aulas.cantidad,aulas.descripcion,estadoAula.id ,estadoAula.estado, ocupante.idocupante ,ocupante.nombre as 'nombreO',ocupante.cargo, ocupante.cuil FROM aulas left JOIN estadoAula ON aulas.id_aula = estadoAula.aula left join ocupante on estadoAula.ocupante = ocupante.idocupante where estado=?;";
        con.query(sql,[op], (err, rows) => {
            if (err) throw err
            const estadoAula = JSON.parse(JSON.stringify(rows));
            res.render('layouts/estadoAula/estadoAula', {estadoAula, op}); 
             
        })
    }
}
var id;
estadoAulaCtrl.cambioEstadoAula = (req,res)=>{
    id = req.params.id;
    var cambio = req.params.estado;
    var nom = req.params.aula;
    if(cambio == "Desocupado"){
        const sql = "SELECT * from ocupante";
        con.query(sql, (err, rows) => {
            if (err) throw err
            const ocupante = rows;
            console.log(ocupante);
            res.render('layouts/estadoAula/listaOcupados', {ocupante,nom});  
        })
    }else{
        const sql = "update estadoAula set estado=?, ocupante=? where id=?";
        con.query(sql, ["Desocupado",null,id], (err, rows)=>{
            if(err) throw err
        })
        id = null;
        res.redirect('/estadoAula/Ocupado');
    }

}
estadoAulaCtrl.realizarCambio = (req,res) =>{
    var ido = req.params.ido;
    const sql = "update estadoAula set estado=?, ocupante=? where id=?";
    con.query(sql, ["Ocupado",ido,id], (err, rows)=>{
        if(err) throw err
    })
    id = null;
    res.redirect('/estadoAula/Desocupado');
}

module.exports = estadoAulaCtrl;