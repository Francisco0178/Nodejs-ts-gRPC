## Configuración Inicial del Proyecto

### 1. Creación del Proyecto

```bash
npm init -y
```

### 2. Instalación de Dependencias

```bash
npm install --save-dev typescript ts-node @types/node
npm install @grpc/grpc-js && npm install --save-dev protoc-gen-grpc @types/google-protobuf copyfiles
```

### 3. Creación de Archivos y Directorios

- **Crear `tsconfig.json`:**

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

- **Actualizar los scripts en `package.json`:**

```json
"scripts": {
    "build": "npm run generate && tsc && npm run copy-gen",
    "generate": "npm run gen-js && npm run gen-ts",
    "gen-js": "protoc-gen-grpc --js_out=import_style=commonjs,binary:./src/gen/ --grpc_out=grpc_js:./src/gen/ --proto_path=./proto/ users.proto",
    "gen-ts": "protoc-gen-grpc-ts --ts_out=grpc_js:./src/gen/ --proto_path=./proto/ users.proto",
    "copy-gen": "copyfiles -u 1 \"src/gen/*.js\" dist/",
    "server": "node dist/server/server.js",
    "dev": "ts-node src/server/server.ts"
  },
```

- **Crear `proto/users.proto`:**

```protobuf
syntax = "proto3";

package user;

// Mensaje para un usuario
message User {
  int32 id = 1;
  string nombre = 2;
  int32 edad = 3;
  string ciudad = 4;
}

// Mensaje para solicitudes
message GetUserRequest {
  int32 id = 1;
}

// Mensaje para respuestas con un usuario
message GetUserResponse {
  User user = 1;
}

// Servicio
service UserService {
  rpc GetUser (GetUserRequest) returns (GetUserResponse);
}
```

### 4. Configuración del Servidor

- **Crear `src/server/db.ts`:**

```typescript
import { User } from '../gen/users_pb';

// Función para convertir datos crudos a la clase User
export function userToClass({ id, nombre, edad, ciudad }: User.AsObject): User {
  const user = new User();
  user.setId(id);
  user.setNombre(nombre);
  user.setEdad(edad);
  user.setCiudad(ciudad);
  return user;
}

// Datos simulados de usuarios
export const users: User[] = [
  { id: 1, nombre: 'Hopper', edad: 28, ciudad: 'New York' },
  { id: 2, nombre: 'Panchito', edad: 30, ciudad: 'Mexico City' },
].map(userToClass);
```

- **Crear `src/server/services.ts`:**

```typescript
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
```

- **Crear `src/server/server.ts`:**

```typescript
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
```
