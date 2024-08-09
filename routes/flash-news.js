const router = new require('express').Router();


router.get('/', require('../controllers/flash-news').all);


router.post('/', require('../middleweares/auth').checkRole('aministrateur'), require('../controllers/flash-news').add);

router.put('/:id', require('../middleweares/auth').checkRole('aministrateur'), require('../controllers/flash-news').update);



module.exports = router;