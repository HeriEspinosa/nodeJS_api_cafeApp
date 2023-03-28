const Product = require('../models/products.model');

exports.validProducts = (req, res, next) => {};

exports.validExistProduct = async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findOne({
        where: {
            id,
            status: true,
        },
    });

    if (!product) {
        return res.status(404).json({
            status: 'error',
            message: `Product with id: ${id} not found`,
        });
    }

    req.product = product;
    next();
};
