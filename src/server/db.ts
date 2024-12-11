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
