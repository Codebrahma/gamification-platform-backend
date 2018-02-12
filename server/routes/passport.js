const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt; //  eslint-disable-line
const bcrypt = require('bcrypt');
const config = require('config');
const User = require('../../db/schema/userSchema');

const localOptions = {
	usernameField: 'email',
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
	User.findOne({ email })
		.then((user) => {
			if (!user) {
				done(null, false, { error: 'Your login details could not be verified. Please try again.' });
			} else {
				bcrypt.compare(password, user.password)
					.then((res) => {
						if (res) {
							done(null, user);
						} else {
							done(null, false, { error: 'Your login details could not be verified. Please try again.' });
						}
					});
			}
		}).catch(done);
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
	secretOrKey: config.get('app.token_secret'),
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
	User.findById(payload._id, (err, user) => { //  eslint-disable-line
		if (err) {
			done(err, false);
		} else if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

passport.use(localLogin);
passport.use(jwtLogin);
