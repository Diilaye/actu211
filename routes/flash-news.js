const router = new require('express').Router();


router.get('/', require('../controllers/flash-news').all);


router.post('/', require('../middleweares/auth').checkRole('aministrateur'), require('../controllers/flash-news').add);



module.exports = router;