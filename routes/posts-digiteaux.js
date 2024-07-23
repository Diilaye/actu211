const router = new require('express').Router();


router.get('/', require('../controllers/posts-digiteaux').all);


router.post('/', require('../middleweares/auth').checkRole('aministrateur'), require('../controllers/posts-digiteaux').add);



module.exports = router;