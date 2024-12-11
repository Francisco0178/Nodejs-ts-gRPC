import * as grpc from '@grpc/grpc-js';
import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { IUserServiceServer } from '../gen/users_grpc_pb';
import { GetUserRequest, GetUserResponse, User } from '../gen/users_pb';
import { users } from './db';

// Estilo basado en objetos para la implementación del servidor
export const UserService: IUserServiceServer = {
  getUser(call: ServerUnaryCall<GetUserRequest, GetUserResponse>, callback: sendUnaryData<GetUserResponse>): void {
    const userId = call.request.getId();

    // Buscar el usuario en la base de datos simulada
    const existingUser = users.find((user) => user.getId() === userId);

    if (existingUser) {
      const response = new GetUserResponse();
      response.setUser(existingUser);

      console.log('Usuario encontrado:', existingUser.toObject());
      callback(null, response);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Usuario no encontrado',
      });
    }
  },
};
