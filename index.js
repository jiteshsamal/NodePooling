const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const pusherRoutes = require('./app/Routes/pusher-routes')
const path = require('path')
var Pusher = require('pusher');
var mongoose = require('mongoose');

var pusher = new Pusher({
    appId: '468619',
    key: '851333eb651b2537896c',
    secret: '491d44f1c5071173cd4e',
    cluster: 'us2',
    encrypted: true
});
var data = [{
    name: 'Apple',
    vote: 1
}, {
    name: 'Microsoft',
    vote: 2
}, {
    name: 'Linux',
    vote: 4
}, {
    name: 'Android',
    vote: 1
}];

mongoose.connect('mongodb://localhost:27017/Github-projects');



app.use(express.static(path.join(__dirname, 'app/Views')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



var datamodel = require('./app/Model/voteModel')
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'app/Views/index.html'))
})
app.get('/GetVoteData', function(req, res) {
    var initialVote = new datamodel({
        email: 'jitesh.samal@gmail.com',
        votedOS: 'Microsoft'
    })
    initialVote.save(function(err, nedata) {
        console.log(nedata);
        res.send(data);
    })

})



app.post('/postVote', function(req, res) {
    console.log(req.body);
    console.log(data);
    data.map(function(my) {
        if (my.name == req.body.osType) {
            my.vote++;
        }
    });
    pusher.trigger('my-channel', 'voted', {
        "voteData": data
    });
})

app.use(pusherRoutes);

app.listen(3000);