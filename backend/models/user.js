import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  playerHistory: [{
    game: String,
    score: Number,
    date: { type: Date, default: Date.now }
  }]
});

export default mongoose.model('User', userSchema);

