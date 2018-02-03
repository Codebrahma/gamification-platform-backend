import { Schema } from 'mongoose';

const UserSchema = new Schema({
	userName: String,
	email: String,
	password: String,
});

export default UserSchema;

