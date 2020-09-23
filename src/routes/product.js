const router = require('express').Router();
const product = require('../controllers/product');

const uploadHelper = require('../helper/upload');

router.post('/', uploadHelper.single('picture'), product.create);
router.get('/:id', product.findById);
router.get('/', product.findAll);
router.put('/:id', product.updateAll);
router.patch('/:id', product.updateById);
router.delete('/:id', product.deleteById);

module.exports = router;