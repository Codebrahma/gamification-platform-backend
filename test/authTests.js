const config = require('config');
const should = require('should'); // eslint-disable-line
const reqClient = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

const validUser = { password: 'secretpw', userName: 'gamify', email: 'gamify@cb.com' };
const validLoginData = { password: 'secretpw', email: 'gamify@cb.com' };
const authApiPath = `/api/${config.get('app.apiVersion')}/auth`;
const IP = '127.0.0.1';

describe('Test Registration', () => {
	after((done) => {
		mongoose.connection.collections.users.drop(() => done());
	});

	it('should FAIL to create a user without parameters', (done) => {
		reqClient(app)
			.post(`${authApiPath}/registration`)
			.set('X-Real-IP', IP)
			.expect(422)
			.end((err, res) => {
				if (err) {
					done(err);
					return;
				}

				res.body.error.should.be.eql('Bad request. Request data invalid or missing.');
				done();
			});
	});

	it('should FAIL to create a user with invalid parameters', (done) => {
		reqClient(app)
			.post(`${authApiPath}/registration`)
			.set('X-Real-IP', IP)
			.send({ email: validUser.email, userName: validUser.username })
			.expect(422)
			.end((err, res) => {
				if (err) {
					done(err);
					return;
				}

				res.body.error.should.be.eql('Bad request. Request data invalid or missing.');
				done();
			});
	});

	it('should create a user when valid data is sent', (done) => {
		reqClient(app)
			.post(`${authApiPath}/registration`)
			.set('X-Real-IP', IP)
			.send({ ...validUser })
			.expect(200)
			.end((err, res) => {
				if (err) {
					done(err);
					return;
				}

				res.body.should.be.an.instanceOf(Object);
				done();
			});
	});

	it('should FAIL to create a user with existing email or username', (done) => {
		reqClient(app)
			.post(`${authApiPath}/registration`)
			.set('X-Real-IP', IP)
			.send({ ...validUser })
			.expect(422)
			.end((err, res) => {
				if (err) {
					done(err);
					return;
				}

				res.body.error.should.be.eql('That email address or username is already in use.');
				done();
			});
	});
});

describe('Test login', () => {
	before((done) => {
		reqClient(app)
			.post(`${authApiPath}/registration`)
			.set('X-Real-IP', IP)
			.send({ ...validUser })
			.expect(200)
			.end((err) => {
				if (err) {
					done(err);
					return;
				}
				done();
			});
	});

	after((done) => {
		mongoose.connection.collections.users.drop(() => done());
	});

	it('should return 400 with empty credentials', (done) => {
		reqClient(app)
			.post(`${authApiPath}/login`)
			.set('X-Real-IP', IP)
			.expect(400, done);
	});

	it('should return token after successful login', (done) => {
		reqClient(app)
			.post(`${authApiPath}/login`)
			.set('X-Real-IP', IP)
			.send({ ...validLoginData })
			.expect(200)
			.end((err, res) => {
				if (err) {
					done(err);
					return;
				}
				res.body.should.have.property('token');
				done();
			});
	});

	it('should return 401 on unsuccessful login', (done) => {
		reqClient(app)
			.post(`${authApiPath}/login`)
			.set('X-Real-IP', IP)
			.send({ ...validLoginData, email: 'unknow@cb.com' })
			.expect(401, done);
	});

	it('should return 401 on unsuccessful login', (done) => {
		reqClient(app)
			.post(`${authApiPath}/login`)
			.set('X-Real-IP', IP)
			.send({ ...validLoginData, password: 'empty' })
			.expect(401, done);
	});
});
