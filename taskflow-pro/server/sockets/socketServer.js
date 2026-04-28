export const setupSocket = (io) => {
  io.on('connection', (socket) => {
    socket.on('join-user-room', (userId) => {
      socket.join(`user:${userId}`);
    });

    socket.on('task-comment', ({ taskId, comment }) => {
      io.emit(`task:${taskId}:comment`, comment);
    });

    socket.on('disconnect', () => {
      // no-op
    });
  });
};
