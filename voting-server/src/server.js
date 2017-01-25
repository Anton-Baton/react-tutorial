import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    store.dispatch({
      type: 'ADD_CLIENT',
      client: socket.id
    })
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });

  io.on('disconnect', (socket) => {
    store.dispatch({
      type: 'REMOVE_CLIENT',
      client: socket.id
    });
  });

}
