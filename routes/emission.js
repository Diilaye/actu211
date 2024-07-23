const router = new require('express').Router();


router.get('/', require('../controllers/emission').all);


router.post('/', require('../middleweares/auth').checkRole('aministrateur'), require('../controllers/emission').add);



module.exports = router;