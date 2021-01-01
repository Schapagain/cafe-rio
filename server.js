
// connect to database
require('./database');

// Start the server and listen on port
const app = require('./app');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('Listening on port',PORT));

