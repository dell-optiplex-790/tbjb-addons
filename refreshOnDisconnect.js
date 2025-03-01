setTimeout(() => {
  socket.on('disconnect', () => {
    location.reload();
  })
}, 45);
