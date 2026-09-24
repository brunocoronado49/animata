import mongoose from 'mongoose';

const vaccinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Vaccine name is required'] },
    appliedAt: { type: Date, required: [true, 'Application date is required'] },
    nextDueDate: { type: Date },
    batchNumber: { type: String },
  },
  { _id: false },
);

const dewormingSchema = new mongoose.Schema(
  {
    product: { type: String, required: [true, 'Product name is required'] },
    appliedAt: { type: Date, required: [true, 'Application date is required'] },
    nextDueDate: { type: Date },
    weightKg: { type: Number },
  },
  { _id: false },
);

const petSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner',
      required: [true, 'Owner ID is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Pet name is required'],
      trim: true,
    },
    species: {
      type: String,
      required: [true, 'Species is required'],
      enum: ['DOG', 'CAT', 'BIRD', 'REPTILE', 'OTHER'],
      default: 'DOG',
    },
    breed: {
      type: String,
      required: [true, 'Breed is required'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['MALE', 'FEMALE'],
    },
    isNeutered: {
      type: Boolean,
      default: false,
    },
    birthDate: {
      type: Date,
      required: [true, 'Birth date is required'],
    },
    microchipId: {
      type: String,
      unique: true,
      sparse: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'DECEASED', 'INACTIVE'],
      default: 'ACTIVE',
    },
    vaccinations: [vaccinationSchema],
    dewormings: [dewormingSchema],
  },
  {
    timestamps: true,
  },
);

petSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, { _id, __v, ...rest }) => ({ ...rest }),
});

export const petModel = mongoose.model('Pet', petSchema);
