import { Server, Socket } from 'socket.io';

export const sockets = (io: Server) => {
	io.on('connection', (socket: Socket) => {
		socket.on('FRIEND_REQUEST_SENT', (data) => {
			socket.broadcast.emit('FRIEND_REQUEST_RECEIVED', {
				data,
			});
		});

		socket.on('STATUS_SENT', (data) => {
			console.log(data);
			socket.broadcast.emit('STATUS_RECEIVED', {
				data,
			});
		});
	});
};
