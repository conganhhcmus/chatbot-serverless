'use strict';
const chatbotController = require('./controllers/chatbotController');

module.exports = {
    hello: (res, req, next) => {
        return next(null, {
            statusCode: 200,
            body: JSON.stringify({
                access_token: process.env.PAGE_ACCESS_TOKEN,
                verify_token: process.env.VERIFY_TOKEN,
            }),
        });
    },
    webhook: (res, req, next) => {
        if (res.method === 'GET') {
            return require('./middleware/verifyTokenWebhook')(res, req, next);
        } else {
            return chatbotController.postWebhook(res, req, next);
        }
    },
    setupGetStarted: (res, req, next) => {
        return require('./api/messenger').setUpProfile(res, req, next);
    },
    removeStarted: (res, req, next) => {
        return require('./api/messenger').removeProfile(res, req, next);
    },
    setupPersistentMenu: (res, req, next) => {
        return require('./api/messenger').setupPersistentMenu(res, req, next);
    },
    removePersistentMenu: (res, req, next) => {
        return require('./api/messenger').removePersistentMenu(res, req, next);
    },
};
