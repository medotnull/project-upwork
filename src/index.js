require('dotenv').config();
const express = require("express");
const cors = require("cors");

const db = require("./config/db")
const jwt = require("./config/jwt")

//routes
const authRoutes = require("./routes/auth")

const app = express();
const PORT = process.env.PORT || 3000

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//middleaware
app.request(express.json());

//routes
app.request("/api/auth")

//start server
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: ${await db.healthCheck()}`);

    try {
        await db.query('SELECT NOW()');
        console.log('Postgres connected');
    } catch (error) {
        console.error('Postgres connection failed:', error.message)
    }
})

module.exports = app;