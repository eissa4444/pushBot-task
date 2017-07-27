var mongoose = require('mongoose');
var schema = mongoose.Schema;

var deviceSchema = new schema({
    deviceID: String,
    token: String
});

var Device = mongoose.model('Device', deviceSchema);

module.exports = {
    Device: Device
}