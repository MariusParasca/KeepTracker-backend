import mongoose from 'mongoose';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/keepTraker');

mongoose.connection
  .once('open', () => {
    console.log('Connection to MongoDB has been made, now make fireworks...');
  })
  .on('error', error => {
    console.log('Connection error:', error);
  });
