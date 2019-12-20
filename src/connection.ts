import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/keepTraker', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection
  .once('open', () => {
    console.log('Connection has been made, now make fireworks...');
  })
  .on('error', error => {
    console.log('Connection error:', error);
  });
