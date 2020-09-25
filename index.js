require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.listen(process.env.PORT, () => {
	console.log('Listening on http://localhost:5000/');
});

//provide static file
app.use('/product/uploads/img', express.static('assets/uploads'));

const productRouter = require('./src/routes/product');
const categoryRouter = require('./src/routes/category');
const userRouter = require('./src/routes/user');
const cartRouter = require('./src/routes/cart');
const conditionsRouter = require('./src/routes/conditions');
const rolesRouter = require('./src/routes/roles');

// attach member router
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/user', userRouter);
app.use('/conditions', conditionsRouter);
app.use('/roles', rolesRouter);

//Customer auth
const customerAuth = require('./src/middlewares/auth');
app.use('/cart', customerAuth, cartRouter);
