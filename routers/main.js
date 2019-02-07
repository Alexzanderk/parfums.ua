const { Router } = require('express');
const bodyParser = require('body-parser');

const router = Router();

const { main } = require('../controllers');


router.use(bodyParser.json());

router.get('/', main.showMainPage);
router.post('/', main.getPostsUrls);
router.post('/save', main.saveComments);



module.exports = router;