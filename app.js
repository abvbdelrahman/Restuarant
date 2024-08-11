const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
const userRouter = require('./routes/userRouter');
const foodRouter = require('./routes/foodRouter');
const orderRouter = require('./routes/orderRouter');
const restaurantRouter = require('./routes/restaurantRouter');
const categoryRouter = require('./routes/categoryRouter');

const app = express();

app.use(cors());
// Set security headers
app.use(helmet());

// JSON parsing
app.use(express.json());

// Cookie parsing
app.use(cookieParser());

// Request logging
app.use(morgan('dev'));

// Gzip compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Static files
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
}));

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/foods', foodRouter);
app.use('/api/v1/category', categoryRouter);
// 404 handler
app.all('*', (req, res, next) => {
  const error = new Error(`Cannot find ${req.originalUrl} on this server`);
  error.statusCode = 404;
  next(error);
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message,
  });
});

module.exports = app;
