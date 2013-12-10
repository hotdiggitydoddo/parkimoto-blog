process.env.TZ = 'America/Los_Angeles';
// Start sails and pass it command line arguments
require('sails').lift(require('optimist').argv);
