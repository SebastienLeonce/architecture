import express         from 'express'
import bodyParser      from 'body-parser'
import cookieParser    from 'cookie-parser'

import apiRouter       from './router/Route'
import db              from './plugins/db';db;
import swagger         from './plugins/swagger'
import { cookieProps } from 'utils/jwt-utils';

const port   = process.env.PORT || 3000;

const app    = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(cookieProps.secret));

app.use('/api', apiRouter);
swagger(app);

app.listen(port, () => {
    console.log(`Server start on port ${port}`)
});

export default app;
