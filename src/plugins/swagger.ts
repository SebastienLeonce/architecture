import { Express }  from 'express'

import swaggerUi      from 'swagger-ui-express';
import swaggerAutogen from "swagger-autogen";

export default async (app : Express) => {
    const doc = {
        info: {
            title: 'Express API',
            version: '1.0.0',
            description: 'This is a REST API application made with Express.',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Sébastien LEONCE',
                mail: 'mailto:sebastienleonce91@gmail.com',
            },
        },
        host: "localhost:3000/api",
    };

    const outputFile = "/null";
    const endpointsFiles = ["src/router/Route"];

    const swaggerSpec = await swaggerAutogen()(outputFile, endpointsFiles, doc);

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec.data));
}
