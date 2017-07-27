var express = require('express')
var models = require('../models/models.js');
var Device = models.Device;
var router = express.Router();

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
module.exports = router;
