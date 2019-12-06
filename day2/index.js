const { messageBirdKey } = require('./config'),
messageBird = require('messagebird')(messageBirdKey);

module.exports = async function (context, req) {
    context.log('Function to send sms using MessageBird');
    if (req.query.name && (req.body && req.body.message  && req.body.phone)) {
        messageBird.verify.create(req.body.phoneNo, {
            template: `Hi ${req.query.name}, remember to ${req.body.message}`,
            }, function(err, response){
                if (err) {
                    context.res = {
                        status: 500,
                        body: "Something went wrong - "+ err
                    }
                }
                context.res = {
                    body: "SMS sent"
                };
        })
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string and a message and phone number in the request body"
        }
    }
};