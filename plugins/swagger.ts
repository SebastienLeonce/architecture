import { Express }    from 'express'

import swaggerUi      from 'swagger-ui-express';
import swaggerAutogen from 'swagger-autogen';

import info           from 'docs/info';
import servers        from 'docs/servers';

export default async (app : Express) => {
    const doc = {
        ...info,
        ...servers,
        schemes: ['http'],
    };

    const outputFile = './docs/swagger-output.json';
    const endpointsFiles = ['router/Route'];

    const swaggerSpec = await swaggerAutogen()(outputFile, endpointsFiles, doc)

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec.data));
}
