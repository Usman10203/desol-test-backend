const express = require('express');
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

connectDB();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// const corsOptions = {
//     origin: '*',
//     credentials: true,
//     methods: 'GET,POST,DELETE,UPDATE,PUT,PATCH',
//     optionsSuccessStatus: 200,
//     preflightContinue: false,
//     allowedHeaders: 'Content-Type,Authorization',
// };

const allowedOrigins = [
    "http://localhost:3000",  // Local development
    "https://test-desol-frontend-aweo.vercel.app", // Deployed frontend origin 1
    "https://test-desol-frontend-aweo.vercel.app/" // Deployed frontend origin 2 (with trailing slash)
];

const corsOptions = {
    origin: allowedOrigins,
    credentials: true, // Allow cookies for authenticated requests (if applicable)
    methods: 'GET,POST,DELETE,PUT,PATCH',
    allowedHeaders: 'Content-Type,Authorization',
    optionsSuccessStatus: 200, // Required for preflight requests
    preflightContinue: false // Pass through preflight requests (optional)
};

app.use(cors(corsOptions));
//app.options(cors());

app.get('/', (req, res) => {
    res.send({ title: 'Backend APP is Runnig' });
})

// app.get('/', (req, res) => res.send(`Server is running on port ${port}`));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use("/api/v1/user/", require("./routes/userRoutes"));
app.use("/api/v1/car/", require("./routes/carRoutes"));
