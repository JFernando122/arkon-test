const express = require('express');
require('dotenv').config();
const app = express();

const db = require('./config/initDatabase');

const v1 = require('./api/v1/routes/index');

const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/v1', v1);

app.use('/', (req, res) => {
  console.log(`route ${req.url} doesnt exists`);

  return res.sendStatus(404);
})

if(require.main === module) {
  app.listen(port, async () => {
    console.log(`app running in port ${port}`);
  
    try {
      db.authenticate()
      .then(() => {
        console.log('Connection successful');
      });
    } catch (error) {
      console.log('Error while conecting to the database', error);
    }
  });
}

module.exports = app;