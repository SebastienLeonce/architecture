import { Express }  from 'express'

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi    from 'swagger-ui-express';

import components   from '@docs/components';
import info         from '@docs/info';
import servers      from '@docs/servers';
import paths        from '@docs/paths';

export default (app : Express) => {
    const swaggerDefinition = {
        openapi: '3.0.0',
        ...info,
        ...servers,
        ...components,
        ...paths
    };

    const options = {
        swaggerDefinition,
        apis: ['./router/*.ts'],
    };

    const swaggerSpec = swaggerJSDoc(options);

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
