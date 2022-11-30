const {Router} = require ('express');
const router = Router();

const {
    renderListEstadoAula,
    cambioEstadoAula,
    realizarCambio
} = require('../controllers/estadoAula.controller');

router.get('/estadoAula/:op', renderListEstadoAula);
router.get('/estadoAula/cambio/:estado/:id/:aula', cambioEstadoAula);
router.get('/estadoAula/realizarCambio/:ido', realizarCambio);


module.exports = router;