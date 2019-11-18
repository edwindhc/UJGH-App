// const { omit } = require('lodash');
const { handler } = require('../middlewares/error');
const Token = require('../models/token')
const Proyect = require('../models/proyect')
const crypto = require('crypto')
var mime = require('mime');
var fs = require('fs');


exports.list = async (req, res) => {
    try {
        let proyects = await Proyect.prototype.list(req.query);
        if (proyects) return res.json(proyects);
    } catch (e) {
        handler(e, req, res);
    }
};

exports.download = async (req, res) => {
    try {
        let { filename, filePath } = req.body;
        filePath = filePath + filename;
        return res.download(filePath, filename);
    } catch (e) {
        handler(e, req, res);
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.body;
        const detele = await Proyect.prototype.delete(id);
        if (detele) return res.json(detele.dataValues)
    } catch (e) {
        handler(e, req, res);
    }
};



exports.upload = async (req, res, next) => {
    try {
        if (req.files === null) return res.status(400).json({ message: 'No existe archivo' })
        const token = req.headers.authorization;
        const transform = token.replace('Bearer ', '');
        const random = `${crypto.randomBytes(5).toString('hex')}`;
        const getUser = await Token.prototype.get(transform)
        let user = getUser;
        user.UserId = getUser['User.id']
        const file = req.files.file;
        user.filename = random + file.name;
        user.filePath = 'src/uploads/'
        const name = req.name || user.filename;

        const { filename, filePath, UserId } = user
        const { qualification } = req.body

        const all = { name, filename, filePath, UserId, qualification }

        file.mv(`${filePath}${filename}`, err => {
            if (err) return res.status(500).send(err)
        })
        const create = await Proyect.prototype.create(all)
        if (create) return res.json(create.dataValues)

    } catch (error) {
        handler(error, req, res);
    }
};
