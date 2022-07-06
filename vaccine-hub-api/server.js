const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {NotFoundError} = require('./utils/errors')

const server = express()

server.use(morgan('tiny'));
server.use(express.json());
server.use(cors());

server.use((req,res,next) => {
    return next(new NotFoundError());
})

const PORT = process.env.port || 3001

server.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
});