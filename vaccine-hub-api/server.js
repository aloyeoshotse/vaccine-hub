const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const {BadRequestError, NotFoundError} = require('./utils/errors')

const app = express()

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

app.use((req,res,next) => {
    return next(new NotFoundError());
})

app.use((err,req,res,next) => {
    const status = err.status || 500;
    const message = err.message

    return res.status(status).json({
        error: {message, status}
    })
})

const PORT = process.env.port || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
});