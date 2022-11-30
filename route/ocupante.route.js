const {Router} = require ('express');
const router = Router();

const {
    renderListOcupante,
    createFromOcupante,
    createOcupante,
    updateFromOcupante,
    updateOcupante,
    deleteOcupante
} = require('../controllers/ocupante.controller');

router.get('/ocupante', renderListOcupante);
router.get('/ocupante/createFrom', createFromOcupante);
router.post('/ocupante/create', createOcupante);
router.get('/ocupante/updateFrom/:cuil', updateFromOcupante);
router.post('/ocupante/update', updateOcupante);
router.get('/ocupante/delete/:cuil', deleteOcupante);

module.exports = router;