const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const port = process.env.PORT || 4000;

// Connect to DB
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log(`Connected to the database`);
    })
    .catch((err) => {
        console.error(`Error connecting to the database: ${err.message}`);
    });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const studentRoute = require('./route/student_route');
app.use('/student', studentRoute);

const adminRoute = require('./route/admin_route')
app.use('/admin',adminRoute)

const FeeDetails = require('./route/feedetails_route')
app.use('/feedetail',FeeDetails)

// Start the server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
