const router = new require('express').Router();


router.get('/', require('../controllers/journal-papier').all);


router.post('/', require('../middleweares/auth').checkRole('aministrateur'), require('../controllers/journal-papier').add);



module.exports = router;