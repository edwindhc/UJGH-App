const { omit } = require('lodash');
const { handler } = require('../middlewares/error');
const User = require('../models/User');
const Token = require('../models/Token');
const moment = require('moment-timezone');

function generateTokenResponse(user, accessToken) {
    const tokenType = 'Bearer';
    const refreshToken = Token.prototype.generate(user);
    const expiresIn = moment().add(9999, 'minutes');
    return {
        tokenType, accessToken, refreshToken, expiresIn,
    };
}

exports.register = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await User.prototype.create(body);
        console.log(user, ' user')
        const token = generateTokenResponse(user, await User.prototype.token());
        return res.json({ token, user });
    } catch (error) {
        handler(error, req, res);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { user, accessToken } = await User.prototype.findAndGenerateToken(req.body);
        const token = generateTokenResponse(user, accessToken);
        return res.json({ token, user });
    } catch (error) {
        return next(error);
    }
};