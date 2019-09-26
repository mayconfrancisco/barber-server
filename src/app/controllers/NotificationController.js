import Notification from '../schemas/Notifications';
import User from '../models/User';

class NotificationController {
  async index(req, resp) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkIsProvider) {
      return resp
        .status(401)
        .json({ error: 'Only provider can load notificaitons' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      // .sort('createdAt')
      .sort({ createdAt: 'desc' })
      .limit(20);

    return resp.json(notifications);
  }

  async update(req, resp) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true }, // notificacao como LIDA
      { new: true } // para o mongoose retornar o registro atualizado
    );

    return resp.json(notification);
  }
}

export default new NotificationController();
