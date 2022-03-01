import express         from 'express'
import bodyParser      from 'body-parser'
import cookieParser    from 'cookie-parser'
import cors            from 'cors'

import apiRouter       from './router/Route'
import db              from './plugins/db';
import { cookieProps } from './utils/jwt-utils';

import swaggerSpec     from './plugins/swagger'

const port   = process.env.PORT || 3000;

const app    = express();

if (!db.isConnected())
    db.connection();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(cookieProps.secret));
app.use(cors())

app.use('/api', apiRouter);
app.use("/docs", ...swaggerSpec);

if (process.env.NODE_ENV != 'test') {
    app.listen(port, () => {
       console.log(`Server start on port ${port}`)
    });
}

process.on("exit", () => {
  db.disconnection();
});

export default app;
