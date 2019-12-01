const express = require('express');
// const productsRoutes = require('./products')
// const categoryRoutes = require('./category')
const authRoutes = require('./auth')
const userRoutes = require('./user')
const proyectRoutes = require('./proyect')
const router = express.Router();

// router.use('/products', productsRoutes);
// router.use('/categories', categoryRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/proyect', proyectRoutes);

module.exports = router;