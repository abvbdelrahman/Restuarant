const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/ProductRouter');
const orderRouter = require('./routes/orderRouter');
const menuRouter = require('./routes/menuRouter');

const app = express();

// Set security headers
app.use(helmet());

// JSON parsing
app.use(express.json());

// Cookie parsing
app.use(cookieParser());

// Request logging
app.use(morgan('combined'));

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
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/menuItems', menuRouter);
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
