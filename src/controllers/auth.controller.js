const { handler } = require('../middlewares/error');
const User = require('../models/user');
const Token = require('../models/token');
const moment = require('moment-timezone');

async function generateTokenResponse(user, accessToken) {
    const tokenType = 'Bearer';
    const refreshToken = await Token.prototype.generate(user, accessToken);
    const expiresIn = moment().add(9999, 'minutes');
    return {
        tokenType, accessToken, refreshToken: refreshToken.dataValues.token, expiresIn,
    };
}

exports.register = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await User.prototype.create(body);
        const token = await generateTokenResponse(user, await User.prototype.token());
        return res.json({ token, user });
    } catch (error) {
        handler(error, req, res);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { user, accessToken } = await User.prototype.findAndGenerateToken(req.body);
        const token = await generateTokenResponse(user, accessToken);
        return res.json({ token, user });
    } catch (error) {
        return handler(error, req, res);
    }
};