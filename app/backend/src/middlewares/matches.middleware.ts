import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

class matchesValidation {
  public validation = async (req: Request, res: Response, next: NextFunction, schema: Schema) => {
    const { error } = schema.validate(req.body.isProgress);
    if (error) {
      return res.status(401).json({ message: error.details[0].message });
    }
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  };
}

export default matchesValidation;
