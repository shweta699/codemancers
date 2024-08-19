const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const app = express();

mongoose.connect('mongodb://localhost:27017/user_management', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
