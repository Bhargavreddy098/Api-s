const express = require('express');
const cors = require('cors');
const db = require('./Db');
const dotenv=require('dotenv')


// Routes
const productRoutes = require('./routes/Productroute');
const subcategoryRoutes = require('./routes/Subcategoryroute');
const menuRoutes = require('./routes/Menuroutes');
const userLoginRoutes = require('./routes/UserroutesLogin');
const categoryRoutes = require('./routes/Route'); // assuming this is category CRUD
const submenuroutes=require('./routes/Submenuroutes')
const Orderroutes = require('./routes/Orderroutes');
const Branchroutes = require('./routes/Branchroutes');
const Mainadminroutes=require('./routes/Mainadminroutes')

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

dotenv.config();
// Connect to DB
db();

// Route mounting with base paths
app.use('/', productRoutes);
app.use('/', subcategoryRoutes);
app.use('/', menuRoutes);
app.use('/', categoryRoutes);
app.use('/', userLoginRoutes);
app.use('/',submenuroutes)
app.use('/', Orderroutes);
app.use('/', Branchroutes);
app.use('/', Mainadminroutes)

// Start server
const port = 3009;
app.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});
