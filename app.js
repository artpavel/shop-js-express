const express = require('express');
const path = require('path');
const csrf = require('csurf');
const expressSession = require('express-session');

// our file
const initial = require('./config/initial');
const db = require('./data/database');
const createSessionConfig = require('./config/session');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandleMiddleware = require('./middlewares/error-handler');
const protectAdminMiddleware = require('./middlewares/protect-routes');
const cartMiddleware = require('./middlewares/cart');

// pages
const authRoutes = require('./routes/auth-routes');
const productsRoutes = require('./routes/products-routes');
const baseRoutes = require('./routes/base-routes');
const adminRoutes = require('./routes/admin-routes');
const cartRoutes = require('./routes/cart-routes');
const ordersRoutes = require('./routes/orders-routes')


// express
const app = express();

// active ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// css, js, images
app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));
// request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// security of csrf. Also session and cart
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(cartMiddleware);
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

// work with routes
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/cart', cartRoutes);
// admin and order with protect
app.use(protectAdminMiddleware);
app.use('/orders', ordersRoutes)
app.use('/admin', adminRoutes);


// errors
app.use(errorHandleMiddleware);

// server
db.connectToDatabase()
  .then(() => app.listen(initial.PORT))
  .catch((err) => {
    console.log('Failed to connect to the database');
    console.log(err);
  });
