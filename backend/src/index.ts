import express from 'express'; //express: A web framework for Node.js — it helps you handle HTTP requests (e.g., GET, POST).
import mongoose from 'mongoose'; // A library for working with MongoDB — it simplifies database queries and model creation
import transactionRoutes from './routes/Transactions';
import authenticationRoutes from './routes/authentication';
import cors from 'cors';

// Create Express App and Set Port
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',  // or "*" for any origin (less secure)
  credentials: false,                // if you’re using cookies or auth headers
}));

app.use(express.json()); //  line tells Express to automatically parse incoming JSON request bodies, which is very common in APIs (e.g., when a client sends POST data)

app.use('/api/transactions', transactionRoutes);

app.use('/api/users', authenticationRoutes);


//Route
app.get('/', (req, res) => {
  res.send('Hello from finance assistant backend!');
});

// Connect to MongoDB
const mongoUri = 'mongodb://localhost:27017/finance-assistant';

//Connect to MongoDB and Start the Server
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
