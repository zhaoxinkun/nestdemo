import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

  find() {

    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '123456',
      },
      {
        id: 2,
        name: 'John Doe',
        email: 'john@gmail.com',
        password: '123456',
      },
    ];
  }

  create(user: any) {
    return user;
  }
}
