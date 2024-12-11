// package: user
// file: users.proto

import * as grpc from '@grpc/grpc-js';
import * as users_pb from './users_pb';

interface IUserServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getUser: IUserServiceService_IGetUser;
}

interface IUserServiceService_IGetUser extends grpc.MethodDefinition<users_pb.GetUserRequest, users_pb.GetUserResponse> {
  path: '/user.UserService/GetUser'
  requestStream: false
  responseStream: false
  requestSerialize: grpc.serialize<users_pb.GetUserRequest>;
  requestDeserialize: grpc.deserialize<users_pb.GetUserRequest>;
  responseSerialize: grpc.serialize<users_pb.GetUserResponse>;
  responseDeserialize: grpc.deserialize<users_pb.GetUserResponse>;
}

export const UserServiceService: IUserServiceService;
export interface IUserServiceServer extends grpc.UntypedServiceImplementation {
  getUser: grpc.handleUnaryCall<users_pb.GetUserRequest, users_pb.GetUserResponse>;
}

export interface IUserServiceClient {
  getUser(request: users_pb.GetUserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
  getUser(request: users_pb.GetUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
  getUser(request: users_pb.GetUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
}

export class UserServiceClient extends grpc.Client implements IUserServiceClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
  public getUser(request: users_pb.GetUserRequest, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
  public getUser(request: users_pb.GetUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
  public getUser(request: users_pb.GetUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: users_pb.GetUserResponse) => void): grpc.ClientUnaryCall;
}

