import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import Event from './event.model';

export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const emailValidator = {
  validator: (value: string) =>
    typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message: 'Please provide a valid email address',
};

const BookingSchema = new Schema<IBooking>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    email: { type: String, required: true, trim: true, lowercase: true, validate: emailValidator },
  },
  {
    timestamps: true,
  }
);

// Ensure referenced Event exists before saving the booking.
BookingSchema.pre<IBooking>('save', async function next(next) {
  const exists = await Event.exists({ _id: this.eventId });
  if (!exists) {
    return next(new Error('Referenced event not found'));
  }
  next();
});

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
