const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const socket = require('socket.io');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages.js');
const app = express();

require('dotenv').config();
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/messages', messagesRoutes)

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
).then(() => {
    console.log('Mongo has been connected successfuly');
}
).catch((err) => {
    console.log(err.message);
}
)

const server = app.listen(
    process.env.PORT,
    () => console.log('Server started on port: ', process.env.PORT)
)

const io = socket(server,{
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    }
});

