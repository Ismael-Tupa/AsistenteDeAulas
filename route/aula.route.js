const {Router} = require ('express');
const router = Router();

const {
    renderListAula,
    createFromAula,
    createAula,
    updateFromAula,
    updateAula,
    deleteAula
} = require('../controllers/aula.controller');

router.get('/aula', renderListAula);
router.get('/aula/createFrom', createFromAula);
router.post('/aula/create', createAula);
router.get('/aula/updateFrom/:nombre', updateFromAula);
router.post('/aula/update', updateAula);
router.get('/aula/delete/:nombre', deleteAula);

module.exports = router;