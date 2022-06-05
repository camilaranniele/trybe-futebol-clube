import jwt = require('jsonwebtoken');
import fs = require('fs');

const secret = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

export const createToken = (user: object | null) => {
  const token = jwt.sign({ user }, secret, {
    expiresIn: '20d',
    algorithm: 'HS256',
  });

  return token;
};

export const decoderToken = (token: string) => {
  const decoder = jwt.verify(token, secret);
  return decoder;
};
