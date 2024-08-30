const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const methodOverride = require('method-override');


// Importing and handling database connection
const { handleConnection } = require('./connections/connect');
handleConnection();

// Importing routers
const { userrouter } = require('./routes/userroute');
const { router } = require('./routes/staticroute');

const { reciperouter } = require('./routes/reciperouter'); // Assuming this router handles recipe operations
const { handleCheckauth } = require('./middlewares/authentictaion');

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(cookieParser());
app.use(handleCheckauth);

// View engine setup (assuming EJS)
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Routes
app.use('/', userrouter);
app.use('/', router);
app.use('/', reciperouter); // Assuming '/recipes' route for managing recipes


const PORT = 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
