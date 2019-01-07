
const io = require('socket.io');

class RosWebForwarder {

    constructor(http) {
        this.io = io(http)
        io.on('connection', function( client ){  console.log('Dashboard connected') });
    }

    async broadcast(type, data) {
        io.emit('receivedata', { type, data })
    }

}

export default RosWebForwarder
