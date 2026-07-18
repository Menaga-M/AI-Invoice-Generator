const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require("dotenv").config();
const express = require('express');
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();
const port = 3000

app.use(
    cors({
        origin : "*",
        method : ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders : ["Content-Type", "Authorization"],
    })
);

connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));