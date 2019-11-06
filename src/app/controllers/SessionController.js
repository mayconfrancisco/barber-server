import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../models/User';
import File from '../models/File';

class SessionController {
  async store(req, resp) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return resp.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return resp.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, avatar, provider } = user;

    return resp.json({
      user: {
        id,
        name,
        email,
        provider,
        avatar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
