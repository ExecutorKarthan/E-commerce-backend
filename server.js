const express = require('express');
const routes = require('./routes');
// import sequelize connection

//Set up express and the port values
const app = express();
const PORT = process.env.PORT || 3001;

//Set up middleware fore use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
