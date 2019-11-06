import AvailableService from '../services/AvailableService';

class AvailableController {
  async index(req, resp) {
    const { date } = req.query;

    if (!date) {
      return resp.status(400).json({ error: 'Invalid Date' });
    }

    const searchDate = Number(date);

    const available = await AvailableService.run({
      provider_id: req.params.providerId,
      date: searchDate,
    });

    return resp.json(available);
  }
}

export default new AvailableController();
