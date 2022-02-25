import swaggerAutogen from "swagger-autogen";

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
    host: process.env.API_URL,
};

const outputFile = "swagger-output.json";
const endpointsFiles = ['src/router/Route'];

swaggerAutogen()(outputFile, endpointsFiles, doc);