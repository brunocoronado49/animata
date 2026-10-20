import mongoose from 'mongoose';

const phoneSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: 'mobile',
    },
    number: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    isPrimary: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: [true, 'Street is required'] },
    neighborhood: { type: String },
    city: { type: String },
    zipCode: { type: String },
  },
  { _id: false },
);

const emergencyContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Emergency contact name is required'],
    },
    phone: {
      type: String,
      required: [true, 'Emergency contact phone is required'],
    },
  },
  { _id: false },
);

const ownerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phones: {
      type: [phoneSchema],
      required: [true, 'At least one phone is required'],
    },
    address: {
      type: addressSchema,
      required: [true, 'Address is required'],
    },
    emergencyContact: {
      type: emergencyContactSchema,
      required: [true, 'Emergency contact is required'],
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
  },
  {
    timestamps: true,
  },
);

ownerSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, { _id, __v, ...rest }) => ({ ...rest }),
});

export const ownerModel = mongoose.model('Owner', ownerSchema);
