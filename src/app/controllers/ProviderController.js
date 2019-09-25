import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, resp) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      // include: [File],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return resp.json(providers);
  }
}

export default new ProviderController();
