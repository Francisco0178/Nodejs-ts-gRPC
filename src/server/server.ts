import { Server, ServerCredentials } from '@grpc/grpc-js';
import { UserServiceService } from '../gen/users_grpc_pb';
import { UserService } from './services';

const server = new Server();
server.addService(UserServiceService, UserService);
server.bindAsync('0.0.0.0:5005', ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.error('Error al iniciar el servidor:', error.message);
  } else {
    console.log('Servidor escuchando en el puerto ' + port);
  }
});
