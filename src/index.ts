import 'firebase';

import express from 'express';
import routes from '@routes/index';
import log from '@service/log';

const PORT = process.env.PORT ?? 8080;
const app = express();

app.use(routes);

app.listen(PORT, () => {
  log.info(`🌍 Server is running on port ${PORT}.`);
});
