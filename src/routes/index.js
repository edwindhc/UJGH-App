const express = require('express');
// const productsRoutes = require('./products')
// const categoryRoutes = require('./category')
const userRoutes = require('./auth')
const router = express.Router();

// router.use('/products', productsRoutes);
// router.use('/categories', categoryRoutes);
router.use('/auth', userRoutes);

module.exports = router;