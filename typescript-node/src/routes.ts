import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    name: 'Cristian',
    email: 'cristian@email.com',
    password: '123456',
    techs: ['Node', 'ReactJS', { title: 'Vue', experience: 100 }],
  });

  return response.json({ message: 'Hello World' });
}
