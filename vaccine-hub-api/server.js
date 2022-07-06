const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const server = express()

server.use(morgan('tiny'));
server.use(express.json());
server.use(cors());


const PORT = process.env.port || 3001

server.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
});