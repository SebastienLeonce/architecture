import express    from 'express'
import bodyParser from 'body-parser'

import apiRouter  from './router'
import db         from './plugins/db';db;
import swagger    from './plugins/swagger'

const port   = process.env.PORT || 3000;

const app    = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', apiRouter);
swagger(app);

app.listen(port, () => {
    console.log(`Server start on port ${port}`)
});

export default app;
