import mongoose, { Document, Model, Schema, Types } from 'mongoose';

// Event document interface for TypeScript safety.
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const nonEmptyString = {
  validator: (value: string) => typeof value === 'string' && value.trim().length > 0,
  message: '{PATH} is required and cannot be empty',
};

const slugify = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const normalizeDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }
  return date.toISOString().split('T')[0];
};

const normalizeTime = (value: string): string => {
  const normalized = value.trim();
  const match = normalized.match(/^([01]?\d|2[0-3]):?([0-5]\d)(?:\s*(am|pm))?$/i);
  if (!match) {
    throw new Error('Time must be in HH:mm or HHmm format');
  }

  let [, hour, minute, meridiem] = match;
  let hourNumber = Number(hour);
  const minuteNumber = Number(minute);

  if (meridiem) {
    meridiem = meridiem.toLowerCase();
    if (meridiem === 'pm' && hourNumber < 12) {
      hourNumber += 12;
    }
    if (meridiem === 'am' && hourNumber === 12) {
      hourNumber = 0;
    }
  }

  return `${hourNumber.toString().padStart(2, '0')}:${minuteNumber.toString().padStart(2, '0')}`;
};

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: nonEmptyString, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, required: nonEmptyString, trim: true },
    overview: { type: String, required: nonEmptyString, trim: true },
    image: { type: String, required: nonEmptyString, trim: true },
    venue: { type: String, required: nonEmptyString, trim: true },
    location: { type: String, required: nonEmptyString, trim: true },
    date: { type: String, required: nonEmptyString, trim: true },
    time: { type: String, required: nonEmptyString, trim: true },
    mode: { type: String, required: nonEmptyString, trim: true },
    audience: { type: String, required: nonEmptyString, trim: true },
    agenda: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) => Array.isArray(value) && value.length > 0,
        message: 'Agenda must contain at least one item',
      },
    },
    organizer: { type: String, required: nonEmptyString, trim: true },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) => Array.isArray(value) && value.length > 0,
        message: 'Tags must contain at least one item',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug and normalize date/time before saving.
EventSchema.pre<IEvent>('save', function next(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title);
  }

  try {
    this.date = normalizeDate(this.date);
    this.time = normalizeTime(this.time);
  } catch (error) {
    return next(error as Error);
  }

  next();
});

EventSchema.index({ slug: 1 }, { unique: true });

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
