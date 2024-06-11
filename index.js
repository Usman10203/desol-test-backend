const express = require('express');
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const path = require("path");

connectDB();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;



const allowedOrigins = [
    "http://localhost:3000",
    "https://test-desol-frontend.vercel.app",
    "https://test-desol-frontend.vercel.app/"
];

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: 'GET,POST,DELETE,PUT,PATCH',
    allowedHeaders: 'Content-Type,Authorization',
    optionsSuccessStatus: 200,
    preflightContinue: false
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
