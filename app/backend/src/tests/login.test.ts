import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa se login é feito com sucesso', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 1,
        username: 'User',
        role: 'user',
        email: 'user@@user.com',
        password: '$2a$12$Kyr5ZB7XC6U1ukkOTFaD3uI/XObrPsXQnE7ZO0u5nGhQLqeUnoUHm'
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('O login é feito com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
         email: 'user@user.com',
         password: 'user_123',
       });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.user).to.have.property('id');
    expect(chaiHttpResponse.body.user).to.have.property('username');
    expect(chaiHttpResponse.body.user).to.have.property('role');
    expect(chaiHttpResponse.body.user).to.have.property('email');
    expect(chaiHttpResponse.body.user).to.not.have.property('password');
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('O login é negado quando passa senha incorreta', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'user_1234',
      });
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password');
  });

  it('O login é negado quando não é passado um email válido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'user',
        password: 'user_123',
      });
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password');
  });

  it('O login é negado quando a senha tenha menos de 6 caracteres', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: '123',
      });
    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password');
  });

  it('O login é negado quando o email não é passado ', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: '',
        password: 'user_123',
      });
    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
  });

  it('O login é negado quando a senha não é passada ', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: '',
      });
    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
  });
});
