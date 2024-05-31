import mongoose from 'mongoose';
import Event from '../../domain/models/Event';

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
    galerry: {
      type: Array,
      default: [],
    },
    location: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model<Event>('Event', eventSchema);

export default Event;
