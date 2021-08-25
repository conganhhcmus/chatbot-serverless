const verifyWebhook = (req, res, next) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === process.env.VERIFY_TOKEN) {
        return next(null, parseInt(challenge));
    } else {
        return next('Invalid token');
    }
};

module.exports = verifyWebhook;
