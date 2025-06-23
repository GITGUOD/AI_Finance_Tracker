import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from finance assistant backend!');
});

// Connect to MongoDB
const mongoUri = 'mongodb://localhost:27017/finance-assistant';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
