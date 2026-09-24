import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: [String],
    default: ['VETERINARIO'],
    enum: ['VETERINARIO', 'STAFF'],
  },
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, { _id, __v, password, ...rest }) => ({ ...rest }),
});

export const userModel = mongoose.model('User', userSchema);
