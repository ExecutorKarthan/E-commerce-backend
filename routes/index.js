//Import needed libraries
const router = require('express').Router();
const apiRoutes = require('./api');

//Build a route for the /api endpoint
router.use('/api', apiRoutes);

//Cite that this is an incorrect route if the endpoint cannot be found
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;