var mongoose = require('mongoose');
var schema = mongoose.Schema;

var deviceSchema = new schema({
    deviceId: String,
    token: String,
    platform: Number,
    _id: false

});

var Device = mongoose.model('Device', deviceSchema);

module.exports = {
    Device: Device
}