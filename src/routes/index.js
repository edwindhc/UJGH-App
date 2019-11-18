const express = require('express');
// const productsRoutes = require('./products')
// const categoryRoutes = require('./category')
const userRoutes = require('./auth')
const proyectRoutes = require('./proyect')
const router = express.Router();

// router.use('/products', productsRoutes);
// router.use('/categories', categoryRoutes);
router.use('/auth', userRoutes);
router.use('/proyect', proyectRoutes);

module.exports = router;