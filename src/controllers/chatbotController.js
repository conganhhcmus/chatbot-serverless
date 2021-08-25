const chatbotService = require('./../services/chatbot');

module.exports = {
    postWebhook: (req, res, next) => {
        // Parse the request body from the POST
        let body = req.body;

        // Check the webhook event is from a Page subscription
        if (body.object === 'page') {
            // Iterate over each entry - there may be multiple if batched
            body.entry.forEach(function (entry) {
                // Get the webhook event. entry.messaging is an array, but
                // will only ever contain one event, so we get index 0
                // Gets the body of the webhook event
                const webhook_event = entry.messaging[0];
                console.log(webhook_event);

                // Get the sender PSID
                const sender_psid = webhook_event.sender.id;
                console.log('Sender PSID: ' + sender_psid);
                if (webhook_event.message) {
                    chatbotService.handleMessage(
                        sender_psid,
                        webhook_event.message
                    );
                } else if (webhook_event.postback) {
                    chatbotService.handlePostback(
                        sender_psid,
                        webhook_event.postback
                    );
                }
            });

            // Return a '200 OK' response to all events
            next(null, {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Processed Events',
                }),
            });
        } else {
            // Return a '404 Not Found' if event is not from a page subscription
            next(null, {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'Not found',
                }),
            });
        }
    },
};
