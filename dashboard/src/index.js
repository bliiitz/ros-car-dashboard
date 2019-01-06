const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const RosClient = require("roslibjs-client"); 

app.use("/", express.static(path.join(__dirname, 'public')));

/**
 * set environment vars
 */
const ROS_MASTER_URI = process.env.ROS_MASTER_URI
let connectedSokets = []


io.on('connection', function( client ){  console.log('Dashboard connected') });

const client = new RosClient({
    url: ROS_MASTER_URI
});

var listenerVideo = client.topic.subscribe('rosbag', function(message) {
   console.log('oyupi')
   io.emit('receivedata', {
     type: "video",
     data: message
   })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});