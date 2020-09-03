import express from 'express';

import notes from './routes/notes';

const app = express();
const router = express.Router();

router.use(notes);

app.use('/', router);

module.exports = {
  path: '/api',
  handler: app
};
