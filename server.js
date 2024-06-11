const express = require('express');
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

connectDB();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: [
        process.env.FRONTEND_URL,
        "http://localhost:3000",
        "https://test-desol-frontend-aweo.vercel.app",
        "https://test-desol-frontend-aweo.vercel.app/",
        "*",
    ],
    credentials: true,
    methods: 'GET,POST,DELETE,UPDATE,PUT,PATCH',
    optionsSuccessStatus: 200,
    preflightContinue: false,
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send({ title: 'Backend APP is Runnig' });
})

// app.get('/', (req, res) => res.send(`Server is running on port ${port}`));

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

app.use("/api/v1/user/", require("./routes/userRoutes"));
app.use("/api/v1/car/", require("./routes/carRoutes"));
