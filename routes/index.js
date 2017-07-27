let express = require('express')
let models = require('../models/models.js');
let Device = models.Device;
let router = express.Router();
let http = require('http');
let querystring = require('querystring');
let apns = require("apns")

//register end point  
router.post('/register/:token', function (req, res, next) {
    let platform = checkPlatform(req.params.token);
    let deviceId = "122317498d17";    //device identfier and it should be passed as a parameter

    let device = new Device({
        deviceId: deviceId,
        token: req.params.token,
        platform: platform
    });

    Device.findOneAndUpdate(
        { deviceId: deviceId },
        device,
        { upsert: true, new: true, runValidators: true },
        function (err, device) {
            if (err) {
                // handle error
            } else {
                res.json(device);
            }
        }
    );
});

router.post('/push/:token', function (req, res, next) {
    pushNotification(req.params.token, "hello first push", res);
})

let pushNotification = function (token, msg, res) {
    let apikey = "AIzaSyAcDkr8-aXdZGWzEk2BRCW5ujwjXzEojFw";
    let iosCertificate =
        platform = checkPlatform(token);
    let notification = '';
    //android
    if (platform === 1) {
        let options = {
            host: 'gcm-http.googleapis.com',
            path: '/gcm/send',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=' + apikey
            }
        };
        notification = querystring.stringify({
            "notification": {
                "title": "msg title",
                "text": msg
            },
            "to": token
        });
        let post_req = http.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ' + chunk);
                console.log(res.statusCode);
            });
        });
        // post the data
        post_req.write(notification);
        post_req.end();
        res.json("push success")
    } else if (platform === 0) {   //IOS
        let options, connection, notification;
        options = {
            keyFile: "",
            certFile: "certificates/cert.pem",
            debug: true
        };
        connection = new apns.Connection(options);
        notification = new apns.Notification();
        notification.device = new apns.Device(token);
        notification.alert = msg;
        connection.sendNotification(notification);
    }
}
//0=>ios and 1=>android
let checkPlatform = function (token) {
    token = token.replace(/ /g, '');
    if (token.length == 64) {
        if (token.indexOf("-") || token.indexOf("_") == -1) {
            env = 0;
        } else {
            env = 1;
        }
    } else {
        env = 1;
    }
    return env;
}

module.exports = router;
