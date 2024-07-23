const router = new require('express').Router();


router.get('/', require('../controllers/article').all);
router.get('/top', require('../controllers/article').topArticle);


router.post('/', require('../middleweares/auth').checkRole('aministrateur'), require('../controllers/article').add);



module.exports = router;