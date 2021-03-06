import { subDays } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async store(req, res) {
    const { studentId } = req.params;

    const student = await Student.findOne({
      where: { id: studentId },
    });

    if (!student) {
      return res.status(400).json({ error: 'This user is not a provider' });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id: studentId,
        created_at: { [Op.between]: [subDays(new Date(), 7), new Date()] },
      },
    });

    if (checkins.length >= 5) {
      return res.status(400).json({ error: 'Check-ins number exceeded' });
    }

    const checkin = await Checkin.create({ student_id: studentId });

    return res.json(checkin);
  }

  async index(req, res) {
    const { page } = req.query;
    const { studentId } = req.params;
    let limitSettings = {};

    const student = await Student.findOne({
      where: { id: studentId },
    });

    if (!student) {
      return res.status(400).json({ error: 'This user is not a provider' });
    }

    if (page) {
      const limit = 20;


      limitSettings = {
        offset: (page - 1) * limit,
        limit,
      };
    }

    const checkins = await Checkin.findAll({
      where: { student_id: studentId },
      attributes: ['id', 'created_at'],
      ...limitSettings,
      order: [['created_at', 'DESC']],
    });

    const totalItems = checkins.length;
    const hasMoreItems = page ? !((page * limitSettings.limit) >= totalItems) : false;

    return res.json({ totalItems, hasMoreItems, content: checkins });
  }
}

export default new CheckinController();
