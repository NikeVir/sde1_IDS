const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://nikevir:nikevir@cluster0.knamcec.mongodb.net/IDS?retryWrites=true&w=majority');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});


const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
