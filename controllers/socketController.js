

var io = require('socket.io');

module.exports = {
  init: (server) => {
    this.io = this.io.listen(server); 
    return io;
  },
  get: () => {
    if (!io) {
      throw new Error("socket is not initialized");
    }
    return io;
  }
};