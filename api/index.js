const express = require('express');

const app = express();

const notes = require('./routes/notes');

app.use(notes);

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}
