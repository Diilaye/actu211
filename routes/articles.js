const router = new require('express').Router();


router.get('/', require('../controllers/article').all);
router.get('/top', require('../controllers/article').topArticle);


router.post('/', require('../middleweares/auth').checkRole('aministrateur'), require('../controllers/article').add);

router.put('/active/:id', require('../middleweares/auth').checkRole('aministrateur'), require('../controllers/article').ActiveArticle);
router.put('/:id', require('../middleweares/auth').checkRole('aministrateur'), require('../controllers/article').update);



module.exports = router;