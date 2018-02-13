const config = require('config');
const should = require('should'); // eslint-disable-line
const reqClient = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

const validUser = { password: 'secretpw', userName: 'gamify', email: 'gamify@cb.com' };

describe('Test Registration', () => {
	after((done) => {
		mongoose.connection.collections.users.drop(() => done());
	});

	it('should FAIL to create a user without parameters', (done) => {
		reqClient(app)
			.post(`/api/${config.get('app.apiVersion')}/auth/registration`)
			.set('X-Real-IP', '127.0.0.0.1')
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
			.post(`/api/${config.get('app.apiVersion')}/auth/registration`)
			.set('X-Real-IP', '127.0.0.0.1')
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
			.post(`/api/${config.get('app.apiVersion')}/auth/registration`)
			.set('X-Real-IP', '127.0.0.0.1')
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
			.post(`/api/${config.get('app.apiVersion')}/auth/registration`)
			.set('X-Real-IP', '127.0.0.0.1')
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
