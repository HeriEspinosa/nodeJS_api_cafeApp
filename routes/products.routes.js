const express = require('express');

const productsController = require('../controllers/products.controller');
const productsMiddleware = require('../middlewares/products.middleware');

const validProducts = (req, res, next) => {
    const { name, price, quantity } = req.body;
    if (!name) {
        return res.status(400).json({
            status: 'error',
            message: 'the name is required',
        });
    }
    if (!price) {
        return res.status(400).json({
            status: 'error',
            message: 'the price is required',
        });
    }
    if (!quantity) {
        return res.status(400).json({
            status: 'error',
            message: 'the quantity is required',
        });
    }

    next();
};

const router = express.Router();

router
    .route('/')
    .get(productsController.findAllProducts)
    .post(validProducts, productsController.createProduct);

router
    .route('/:id')
    .get(
        productsMiddleware.validExistProduct,
        productsController.findOneProduct
    )
    .patch(
        productsMiddleware.validProducts,
        productsMiddleware.validExistProduct,
        productsController.updateProduct
    )
    .delete(
        productsMiddleware.validExistProduct,
        productsController.deleteProduct
    );

module.exports = router;
