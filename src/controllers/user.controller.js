const User = require('../models/User');
const { omit } = require('lodash');
const { handler } = require('../middlewares/error');

exports.load = async (req, res, next, id) => {
    try {
        const user = await User.prototype.get(id);
        req.locals = { user };
        return next();
    } catch (e) {
        return handler(e, req, res);
    }
};

exports.get = (req, res) => res.json(req.locals.user);

exports.list = async (req, res) => {
    try {
        let users = await User.prototype.list(req.query);
        if (users) return res.json(users);
    } catch (e) {
        handler(e, req, res);
    }
};

exports.create = async (req, res) => {
    try {
        const user = await User.prototype.create(req.body);
        if (user) return res.json(user.dataValues)
    } catch (e) {
        handler(e, req, res);
    }
};

exports.update = async (req, res) => {
    try {
        const updateUser = omit(req.body);
        const transform = Object.assign(req.locals.user, updateUser);
        const user = await User.prototype.update(transform);
        if (user) return res.json(transform)
    } catch (e) {
        handler(e, req, res);
    }
};

exports.delete = async (req, res) => {
    try {
        const { user } = req.locals;
        const detele = await User.prototype.delete(user.id);
        if (detele) return res.json(detele.dataValues)
    } catch (e) {
        handler(e, req, res);
    }
};