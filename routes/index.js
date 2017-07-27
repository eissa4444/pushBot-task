var express = require('express')
var models = require('../models/models.js');
var Device = models.Device;
var router = express.Router();


router.get('/register', function (req, res) {

    res.json({ notes: "get work ok!" })
});

router.post('/register1/:token', function (req, res) {
    var device = new Device({
        deviceID: "12231749817",
        token: req.params.token
    });
    device.save(function(error,device){
        res.json(device)
    })
    //es.json({ notes: "This is your notebook. Edit this to start saving your notes!" })
})

module.exports = router;
