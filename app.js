require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'costmanager'
    });
    const dataBase = mongoose.connection;
    dataBase.on('error', (error) => console.log(error));
    dataBase.once('open', () => console.log('Connected to database'));
}

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Cost Manager API',
        endpoints: {
            getUser: '/api/users/:id',
            getReport: '/api/report',
            about: '/api/about'
        }
    });
});

const aboutRouter = require('./routes/about');
app.use('/api', aboutRouter);

const userRouter = require('./routes/users');
app.use('/api', userRouter);

const addCostRouter = require('./routes/addcost');
app.use('/api', addCostRouter);

const monthlyReportRouter = require('./routes/report');
app.use('/api', monthlyReportRouter);

module.exports = app;
