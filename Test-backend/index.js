const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

// Enable cross-origin resource sharing
app.use(cors());

// Parse incoming request bodies as JSON (built-in with Express 4.16+)
app.use(express.json());

// Connect to MongoDB database
mongoose.connect('mongodb+srv://Vivek-testing:xTEU90IuGwDkGk5A@cluster0.hqirbyj.mongodb.net/VivekTesting?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB successfully");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Import and use the User Routes
const userRoutes = require('./Routes/Routes');
app.use('/users', userRoutes);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const port = 2000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
