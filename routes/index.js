var express = require('express')
var models = require('../models/models.js');
var Device = models.Device;
var router = express.Router();
var http = require('http');
var querystring = require('querystring');

//register end point  
router.post('/register/:token', function (req, res, next) {
    var platform = checkPlatform(req.params.token);
    var deviceId = "122317498d17";    //device identfier and it should be passed as a parameter

    var device = new Device({
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
    pushNotification(token,"hello first push",res);
})

//0=>ios and 1=>android
var checkPlatform = function (token) {
    var token = token.replace(/ /g, '');
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

var pushNotification = function (token, msg,res) {
    apikey = "AIzaSyAcDkr8-aXdZGWzEk2BRCW5ujwjXzEojFw";
    platform = checkPlatform(token);

    //android
    if (platform === 1) {
        var options = {
            host: 'gcm-http.googleapis.com',
            path: '/gcm/send',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=' + apikey
            }
        };

        var notification = querystring.stringify({
            "notification": {
                "title": "msg title",
                "text": msg
            },
            "to": token
        });
        var post_req = http.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ' + chunk);
            });
        });
        // post the data
        post_req.write(notification);
        post_req.end();
        res.json("push success")
    }
}

module.exports = router;
