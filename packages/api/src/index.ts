import express         from 'express'
import bodyParser      from 'body-parser'
import cookieParser    from 'cookie-parser'
import cors            from 'cors'

import apiRouter       from './router/Route'
import db              from './plugins/db';
import swagger         from './plugins/swagger'
import { cookieProps } from './utils/jwt-utils';

const port   = process.env.PORT || 3000;

const app    = express();

if (!db.isConnected())
    db.connection();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(cookieProps.secret));
app.use(cors())

app.use('/api', apiRouter);
swagger(app);

if (require.main === module) {
    app.listen(port, () => {
       console.log(`Server start on port ${port}`)
    });
}

process.on("exit", () => {
  db.disconnection();
});

export default app;
