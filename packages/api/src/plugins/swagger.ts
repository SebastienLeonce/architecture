import swaggerAutogen from "swagger-autogen";
import swaggerUi      from 'swagger-ui-express'

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
    host: `api.${process.env.DOMAIN}/api`,
    schemes: ['https']
};

const outputFile = "/null";
const endpointsFiles = [
    `${process.env.NODE_ENV == 'prod' 
    ? '/usr/app/packages/api/build/src/router/Route.js' 
    : 'src/router/Route'}`
];

const swaggerSpec = await swaggerAutogen()(outputFile, endpointsFiles, doc);

export default [swaggerUi.serve, swaggerUi.setup(swaggerSpec.data)]