var mongoose = require('mongoose');

var mongooseSchema = new mongoose.Schema({
    email: String,
    votedOS: String
});


var pollingModel = mongoose.model('RealTimePolling', mongooseSchema, 'RealTimePolling');

module.exports = pollingModel;