const express = require('express');
const app = express();
const path = require('path');
const RosWebForwarder = require('./class/ros-web-forwarder.class');
const http = require('http').Server(app);
const RosClient = require("roslibjs-client"); 

/**
 * set environment vars
 */
const ROS_MASTER_URI = process.env.ROS_MASTER_URI

const ROS_FORWARD_RETHINK = (process.env.ROS_FORWARD_RETHINK == "true")
if(ROS_FORWARD_RETHINK)
  const RETHINK = {
    host: process.env.RETHINK_HOST,
    port: parseInt(process.env.RETHINK_HOST),
    db:   process.env.RETHINK_DB,
  }


/**
 * Main process
 */
main()
async function main() {
  app.use("/", express.static(path.join(__dirname, 'public')));
  
  const client = new RosClient({
      url: ROS_MASTER_URI
  });

  const webForwarder = new RosWebForwarder(http)

  if(ROS_FORWARD_RETHINK)
    const rethinkForwarder = new RosRethinkForwarder(RETHINK)
  
  client.topic.subscribe('rosbag', async (message) => {
     console.log('receive video frame data')
     webForwarder.broadcast('video', message)

    if(ROS_FORWARD_RETHINK)
      rethinkForwarder.store('video', message)
  });
  
  http.listen(3000, function(){
    console.log('listening on *:3000');
  });
}

