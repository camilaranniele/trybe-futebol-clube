import * as Bcrypt from 'bcrypt';
import IUser from '../interfaces/IUser';
import { createToken } from '../util/Token';
import User from '../database/models/users';

class LoginService {
  public findUser: IUser | null;

  public async login(useremail: string, password: string) {
    this.findUser = await User
      .findOne({ where: { email: useremail } });

    if (!this.findUser) throw new Error('User not found');

    const compareWithBcrypt = Bcrypt.compare(password, this.findUser.password as string);

    if (!compareWithBcrypt) throw new Error('Incorrect password');
    const { id, username, role, email } = this.findUser;
    const token = createToken(this.findUser);

    return {
      user: {
        id,
        username,
        role,
        email,
      },
      token,
    };
  }

  public async findUserByToken(email: string) {
    this.findUser = await User.findOne({ where: { email } });
    return this.findUser;
  }
}

export default LoginService;
