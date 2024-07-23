const router = new require('express').Router();


router.get('/', require('../controllers/tags').all);

router.get('/:id', require('../controllers/tags').one);

router.put('/:id', require('../controllers/tags').update);

router.delete('/:id', require('../controllers/tags').delete);

router.post('/', require('../middleweares/auth').checkRole('aministrateur'),require('../controllers/tags').add);



module.exports = router;